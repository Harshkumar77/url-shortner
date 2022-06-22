import mongoose from "mongoose"
import { randomUUID } from "node:crypto"

const urlSchema = new mongoose.Schema({
  short: {
    type: String,
    default: () => randomUUID().slice(0, 6),
    required: true,
  },
  complete: {
    type: String,
    required: true,
  },
})

const Url = mongoose.model("url", urlSchema)

export default Url
