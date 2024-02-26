import cookieParser from "cookie-parser"
import passport from "passport"
import mongoose from "mongoose"
import express, { Express } from "express"
import { configurePassport } from "./passport.config"
import morgan from "morgan"

export const configureApp = (app: Express) => {
  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())
  app.use(cookieParser())
  app.use(passport.initialize())
  app.use(morgan("dev"))
  app.set("trust proxy", true)

  const {
    BASE_URL,
    DATABASE_URL,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    IP_INFO_KEY,
    JWT_KEY,
    NODE_ENV,
    PORT,
    DEV_CLIENT_URL
  } = process.env

  if (
    !BASE_URL ||
    !DATABASE_URL ||
    !GOOGLE_CLIENT_ID ||
    !GOOGLE_CLIENT_SECRET ||
    !IP_INFO_KEY ||
    !JWT_KEY ||
    !NODE_ENV ||
    !PORT ||
    !DEV_CLIENT_URL
  )
    throw Error("Check enviornment variables")

  app.listen(PORT, () =>
    console.log(`Server started at ${BASE_URL} at port => ${PORT}`)
  )

  mongoose.connect(DATABASE_URL, (err) => {
    if (err) console.error(err.message)
    else console.log("Connected to database")
  })
  configurePassport()
}
