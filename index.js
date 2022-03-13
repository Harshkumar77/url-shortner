import express from "express"
import mongoose from "mongoose"
import "dotenv/config"
import Url from "./model/Url.js"

const app = express()

mongoose.connect(process.env.MONGO_URL, (err) => {
  if (err) console.error(err)
  console.log("connected to database")
})

app.get("/api/generate", async (req, res) => {
  if (req.query.url)
    res.json({
      short: (await new Url({ complete: req.query.url }).save()).short,
    })
})

app.get("/:short", async (req, res) => {
  const completeURL = (await Url.findOne({ short: req.params.short }))?.complete
  res.redirect(completeURL ?? "/")
})

app.listen(process.env.PORT, (err) => {
  if (err) console.error(err)
  console.log(`server started at port ${process.env.PORT}`)
})
