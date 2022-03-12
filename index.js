import express from "express"
import mongoose from "mongoose"
import "dotenv/config"

const app = express()

mongoose.connect(process.env.MONGO_URL, (err) => {
  if (err) console.error(err)
  console.log("connected to db")
})

app.listen(process.env.PORT, (err) => {
  if (err) console.error(err)
  console.log(`server started at port ${process.env.PORT}`)
})
