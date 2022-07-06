import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { unique: true, type: String, required: true },
    urls: [{ type: mongoose.Types.ObjectId, ref: 'Url', default: [] }],
    profilePic: String,
    accountCreated: {
        type: Date,
        default: Date.now()
    }
})

const User = mongoose.model('User', userSchema)

export async function findOrCreateUser(name: string, email: string, profilePic: string) {
    const existingUser = await User.findOne({ email })
    if (existingUser !== null)
        return existingUser
    return await User.create({
        name, email, profilePic
    })
}

export default User

declare global {
    namespace Express {
        interface User {
            id: string
        }
    }
}