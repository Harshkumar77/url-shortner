import 'dotenv/config'
import mongoose from "mongoose";
import express from 'express'
import { Strategy as GoogleStrategy, VerifyFunctionWithRequest } from 'passport-google-oauth2'
import passport from 'passport';
import cookieParser from 'cookie-parser'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import { findOrCreateUser } from './models/User';
import { verifyUser } from './middleware/auth';

const accessTokens: string[] = []

const { DATABASE_URL, PORT, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, JWT_KEY } = process.env

if (!DATABASE_URL || !PORT || !GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !JWT_KEY)
    throw Error("Check enviornment variables")

mongoose.connect(DATABASE_URL, (err) => {
    if (err)
        console.error(err.message)
    else
        console.log("Connected to database")
})

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize());

const verifyFunction: VerifyFunctionWithRequest = async (request, accessToken, refreshToken, profile, done) => {
    try {
        const user = await findOrCreateUser(profile.displayName, profile.email, profile.picture)
        console.log();
        return done(null, { id: user.id })
    } catch (error) {
        done(error, null)
    }

}

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/callback", passReqToCallback: true,
}, verifyFunction));

app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'], session: false },)); app.get(
    "/auth/callback",
    passport.authenticate("google", {
        session: false
    }),
    (req, res) => {

        if (!req.user) {
            res.status(500)
            return
        }
        const accessToken = jwt.sign({
            id: req.user.id,
        }, JWT_KEY, {
            expiresIn: '10min'
        })

        accessTokens.push(accessToken)

        res.cookie("accessToken", accessToken, {
            secure: true,
            httpOnly: true,
        })
        res.send("hello")
    }
);

app.get('/user', verifyUser, (req, res) => {
    res.send("hmm")
})

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`))
