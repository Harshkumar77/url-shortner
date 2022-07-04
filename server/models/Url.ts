import mongoose, { model } from "mongoose";
import User from './User'
import Stats from './Stats'
import { createHash } from "crypto";

export const urlSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    short: {
        type: String,
        default: "",
        unique: true
    },
    expiringAt: {
        type: Date,
    },
    clicks: {
        type: Number,
        default: 0
    },
    generatedBy: {
        type: mongoose.Types.ObjectId,
        ref: User,
        default: process.env.RANDOM_ACCOUNT_ID
    }
})


urlSchema.pre('save', async function (next) {
    if (!this.isNew)
        return next()
    const stats = await Stats.findOne({})
    if (stats == null || stats.urlDigestIndex == null || stats.urlShorted == null)
        throw new Error("Something wrong with Stats");
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
    this.short = createHash('md5').update("" + stats.urlDigestIndex++).digest('base64url').slice(0, 6)
    next()
    stats.save()
})

urlSchema.post('save', async function (doc, next) {
    const stats = await Stats.findOne({})
    if (stats == null || stats.urlShorted == null)
        throw new Error("Something wrong with Stats");
    stats.urlShorted++;
    stats.save()
    const user = await User.findById(doc.generatedBy)
    console.log(user);
    if (user == null)
        throw Error(`Check user ${doc.generatedBy} or something went wrong`)
    user.urls.push(doc.id)
    user.save()
    next()
})

const Url = mongoose.model('Url', urlSchema)

export default Url