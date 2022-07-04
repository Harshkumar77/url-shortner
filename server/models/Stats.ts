import mongoose from "mongoose";

const statsSchema = new mongoose.Schema({
    urlShorted: {
        type: Number,
        default: 0,
        required: true
    },
    urlDigestIndex: {
        type: Number,
        default: 0,
        required: true
    }
})

const Stats = mongoose.model('Stats', statsSchema)

export default Stats