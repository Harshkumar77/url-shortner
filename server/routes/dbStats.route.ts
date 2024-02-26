import express from "express"
import mongoose from "mongoose"

export const dbStats = express.Router()

dbStats.get("/db-stats", async (req, res) => {
  try {
    const dbStats = await mongoose.connection.db.stats()
    console.log(dbStats)
    return res.send(dbStats)
  } catch (error: any) {
    res.status(500).send("shut up")
    console.error(error)
  }
})
