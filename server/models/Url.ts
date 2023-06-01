import mongoose, { model } from "mongoose"
import { readFileSync } from "fs"
import User from "./User"
import Stats from "./Stats"
import { createHash } from "crypto"

const countries = JSON.parse(
  readFileSync("data/countries.json").toString()
) as Array<{
  name: string
  code: string
  emoji: string
  unicode: string
  image: string
}>

export const urlSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    default: "",
    unique: true,
  },
  expiringAt: {
    type: Date,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  limit: {
    type: Number,
    default: 0,
  },
  generatedBy: {
    type: mongoose.Types.ObjectId,
    ref: User,
    default: process.env.RANDOM_ACCOUNT_ID,
  },
  favicon: String,
  countries: {
    type: Map,
    of: Number,
    default: new Map<string, string>(),
    required: true,
  },
})

urlSchema.pre("save", async function (next) {
  if (!this.isNew) return next()
  const stats = await Stats.findOne({})
  if (stats == null || stats.urlDigestIndex == null || stats.urlShorted == null)
    throw new Error("Something wrong with Stats")
  let foundUnique = true
  // let short = ""
  // while (foundUnique) {
  //     short = createHash('md5').update("" + stats.urlDigestIndex++).digest('base64url').slice(0, 6)
  //     stats.urlDigestIndex++
  //     if (await mongoose.models['Url'].where('short').equals(short) != null) {
  //         console.log(short);
  //         continue
  //     }
  //     foundUnique = false
  // }
  // todo:code for collison
  this.short = createHash("md5")
    .update("" + stats.urlDigestIndex++)
    .digest("base64url")
    .slice(0, 6)
  if (stats == null || stats.urlShorted == null)
    throw new Error("Something wrong with Stats")
  stats.urlShorted++
  const user = await User.findById(this.generatedBy)
  if (user == null)
    throw Error(`Check user ${this.generatedBy} or something went wrong`)
  user.urls.push(this.id)
  user.save()
  next()
  stats.save()
})

// urlSchema.post("save", async function (doc, next) {
//   if (!this.isNew) return next()
// })

export function extendedCountries(doc: any) {
  const c = doc.countries
  const extendedCountries: Array<any> = []
  c.forEach((clicks: number, Code: string) => {
    extendedCountries.push(
      Code === "unknown"
        ? { name: "unknown", clicks }
        : { ...countries.find(({ code }) => code === Code), clicks }
    )
  })
  return { ...doc._doc, countries: extendedCountries }
}

const Url = mongoose.model("Url", urlSchema)

export default Url

export const PopulateUrlIds = async (ids: any) =>
  Promise.all(ids.map((id: any) => Url.findById(id).exec()))
