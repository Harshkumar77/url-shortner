import mongoose, { model } from "mongoose"
import { readFileSync } from "fs"
import User from "./User"
import Stats from "./Stats"
import { createHash , randomUUID} from "crypto"

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

urlSchema.pre("save", async function(next) {
  if (!this.isNew) return next()
  let shortExists = false;
  do {
    this.short = createHash("md5")
      .update(randomUUID())
      .digest("base64url")
      .slice(0, 6)
    shortExists = await Url.findOne({ short: this.short }) !== null
  } while (shortExists);

  const user = await User.findById(this.generatedBy)
  if (!user)
    throw Error("How")
  user.urls.push(this.id)
  await user.save()
  next()
})

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
