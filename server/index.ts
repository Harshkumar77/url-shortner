//https://medium.com/@rustyonrampage/using-oauth-2-0-along-with-jwt-in-node-express-9e0063d911ed
import 'dotenv/config'
import mongoose from "mongoose";
import express from 'express'
import { Strategy as GoogleStrategy, VerifyFunctionWithRequest } from 'passport-google-oauth2'
import { Strategy as JWTStrategy } from 'passport-jwt';
import passport from 'passport';
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'

const { DATABASE_URL, PORT, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env

if (!DATABASE_URL || !PORT || !GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET)
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

// passport.use(new JWTStrategy())

const verifyFunction: VerifyFunctionWithRequest = (request, accessToken, refreshToken, profile, done) => {
    console.log(profile);
    done(null, { name: profile.name, googleId: profile.id })
    // User.findOrCreate({ googleId: profile.id }, function (err: any, user: any) {
    //     return done(err, user);
    // });
}

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/callback",
    passReqToCallback: true
},
    verifyFunction
));



app.get('/auth/google',
    passport.authenticate('google', {
        scope:
            ['email', 'profile'],
    }
    ));
app.get(
    "/auth/callback",
    passport.authenticate("google"), (req, res) => {
        console.log(req.user);
        res.send(req.user)
    }
);

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`))
