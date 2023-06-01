import express from "express"
import passport from "passport"
import jwt, { JwtPayload } from "jsonwebtoken"
import { verifyUser } from "../middleware/auth"
import { URL } from "url"
import Url, { extendedCountries, PopulateUrlIds } from "../models/Url"
import User from "../models/User"

export const urlRouter = express.Router()

urlRouter.post("/api/generate", verifyUser, async (req, res) => {
  if (!req.body.url) {
    res.status(400).end()
    return
  }
  try {
    const u = new URL(req.body.url)
    const favicon = `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${u.origin}&size=256`
    const uu = await Url.create({
      url: req.body.url,
      favicon,
      generatedBy: req.user?.id,
      expiringAt: req.body.expiringAt ?? null,
      limit: req.body.limit ?? 0,
    })
    res.send(uu).status(201)
  } catch (error: any) {
    if (error.code === "ERR_INVALID_URL") res.status(406).end()
    else res.status(500).end()
  }
})

urlRouter.get("/api/urls", verifyUser, async (req, res) => {
  if (!req.user) {
    res.status(500)
    return
  }
  try {
    const urls = (
      await User.findById(req.user.id).populate("urls")
    )?.urls.reverse()
    res.send(urls)
  } catch (error) {
    console.log(error)
    res.status(500)
  }
})

urlRouter.get("/api/urls/recent", verifyUser, async (req, res) => {
  if (!req.user) {
    res.status(500)
    return
  }
  try {
    const urls = (await User.findById(req.user.id))?.urls.reverse()
    const recentUrls = urls?.slice(0, 5)
    res.send(await PopulateUrlIds(recentUrls))
  } catch (error) {
    console.log(error)
    res.status(500)
  }
})

urlRouter.get("/api/url/:id", verifyUser, async (req, res) => {
  if (!req.user) {
    res.status(500)
    return
  }
  try {
    const url = await Url.findById(req.params.id)
    if (url) {
      res.send(extendedCountries(url))
      return
    }
    res.status(404)
  } catch (error: any) {
    res.status(500).send("shut up")
  }
})
