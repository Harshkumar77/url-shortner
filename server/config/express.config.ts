import cookieParser from 'cookie-parser'
import passport from 'passport';
import mongoose from "mongoose";
import express, { Express } from 'express'
import { configurePassport } from './passport.config';

export const configureApp = (app: Express) => {
    app.use(express.urlencoded({ extended: false }))
    app.use(express.json())
    app.use(cookieParser())
    app.use(passport.initialize());

    const { DATABASE_URL, PORT, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, JWT_KEY, NODE_ENV } = process.env

    if (!DATABASE_URL || !PORT || !GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !JWT_KEY || !NODE_ENV)
        throw Error("Check enviornment variables")

    app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`))

    mongoose.connect(DATABASE_URL, (err) => {
        if (err)
            console.error(err.message)
        else
            console.log("Connected to database")
    })
    configurePassport()
}