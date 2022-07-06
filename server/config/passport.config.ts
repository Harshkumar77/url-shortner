import passport from "passport";
import { Strategy as GoogleStrategy, VerifyFunctionWithRequest } from 'passport-google-oauth2'
import { findOrCreateUser } from '../models/User';

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env

const verifyFunction: VerifyFunctionWithRequest = async (request, accessToken, refreshToken, profile, done) => {
    try {
        const user = await findOrCreateUser(profile.displayName, profile.email, profile.picture)
        return done(null, { id: user.id })
    } catch (error) {
        done(error, null)
    }

}

export const configurePassport = () => {
    passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID as string,
        clientSecret: GOOGLE_CLIENT_SECRET as string,
        callbackURL: "http://localhost:8080/auth/callback", passReqToCallback: true,
    }, verifyFunction));
}