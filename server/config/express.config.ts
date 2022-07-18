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
  app.use(express.static("dist"))
  app.set("trust proxy", true)

  const {
    DATABASE_URL,
    PORT,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    JWT_KEY,
    NODE_ENV,
    IP_INFO_KEY,
  } = process.env

  if (
    !DATABASE_URL ||
    !PORT ||
    !GOOGLE_CLIENT_ID ||
    !GOOGLE_CLIENT_SECRET ||
    !JWT_KEY ||
    !NODE_ENV ||
    !IP_INFO_KEY
  )
    throw Error("Check enviornment variables")

  app.listen(PORT, () =>
    console.log(`Server started at http://localhost:${PORT}`)
  )

  mongoose.connect(DATABASE_URL, (err) => {
    if (err) console.error(err.message)
    else console.log("Connected to database")
  })
  configurePassport()
}
