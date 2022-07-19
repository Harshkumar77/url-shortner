import express from "express"
import passport from "passport"
import jwt, { JwtPayload } from "jsonwebtoken"
import { verifyUser } from "../middleware/auth"
import { URL } from "node:url"
import Url from "../models/Url"
import User from "../models/User"
import axios from "axios"

export const redirectRouter = express.Router()

redirectRouter.get("/:short", async (req, res) => {
  try {
    const url = await Url.findOne({ short: req.params.short })
    if (!url) {
      res.redirect(
        (process.env.NODE_ENV as string) === "development"
          ? "http://localhost:3000"
          : "/"
      )
      return
    }

    if (url.limit !== 0 && url.clicks >= url.limit)
      return res.status(404).send("NOT FOUND!")
    if (url.expiringAt && url.expiringAt < new Date())
      return res.status(404).send("NOT FOUND!")

    res.redirect(url.url)
    url.clicks++

    if (process.env.NODE_ENV === "prod")
      await axios
        .get(
          `https://ipinfo.io/${req.ip === "::1" ? "" : req.ip}?token=${
            process.env.IP_INFO_KEY as string
          }`
        )
        .then(({ data }) => {
          const country = data.country || "unknown"
          if (url.countries.has(country))
            url.countries.set(country, url.countries.get(country)! + 1)
          else url.countries.set(country, 1)
        })
    else {
      const countries = ["IN", "US", "CN", "AU", "AE"]
      const randomIdx: number = parseInt("" + Math.random() * countries.length)
      const country = countries[randomIdx]
      if (url.countries.has(country))
        url.countries.set(country, url.countries.get(country)! + 1)
      else url.countries.set(country, 1)
    }
    url.save()
  } catch (error: any) {
    console.log(error.message)
    res.status(500)
  }
})
