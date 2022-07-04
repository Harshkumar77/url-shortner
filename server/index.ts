import 'dotenv/config'
import mongoose from "mongoose";
import express from 'express'

const { DATABASE_URL, PORT } = process.env

if (!DATABASE_URL || !PORT)
    throw Error("Check enviornment variables")

mongoose.connect(DATABASE_URL, (err) => {
    if (err)
        console.error(err.message)
    else
        console.log("Connected to database")
})

const app = express()

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`))
