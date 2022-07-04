import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { unique: true, type: String, required: true },
    urls: [{ type: mongoose.Types.ObjectId, ref: 'Url', default: [] }]
})

const User = mongoose.model('User', userSchema)

export default User