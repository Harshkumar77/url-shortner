import express from "express"
import passport from "passport"
import jwt, { JwtPayload } from "jsonwebtoken"
import { verifyUser } from "../middleware/auth"

export const authRouter = express.Router()

const refreshTokens: string[] = []

const { JWT_KEY } = process.env

authRouter.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
    session: false,
  })
)

authRouter.get(
  "/auth/callback",
  passport.authenticate("google", {
    session: false,
  }),
  (req, res) => {
    if (!req.user) {
      res.status(500).end()
      return
    }
    const refreshToken = jwt.sign(
      {
        id: req.user.id,
      },
      process.env.JWT_KEY as string,
      {
        expiresIn: "10day",
      }
    )

    refreshTokens.push(refreshToken)

    res.cookie("refreshToken", refreshToken, {
      secure: true,
      httpOnly: true,
    })
    if ((process.env.NODE_ENV as string) === "dev")
      res.redirect(`${process.env.DEV_CLIENT_URL as string}`)
    else res.redirect("/")
  }
)

authRouter.get("/auth/user", verifyUser, (req, res) => {
  res.send(req.user)
})

authRouter.post("/auth/access_token", (req, res) => {
  try {
    const jwtResult = jwt.verify(
      req.cookies.refreshToken,
      JWT_KEY as string
    ) as JwtPayload
    const access_token = jwt.sign({ id: jwtResult.id }, JWT_KEY as string, {
      expiresIn: "10min",
    })
    res.json({ access_token })
  } catch (error: any) {
    console.log(error.name)
    if (error.name == "TokenExpiredError") {
      res.status(403).send(error)
    } else res.status(400).send(error)
  }
})

authRouter.use("/tnc", (_, res) => {
  return res.send(
    `<script src="https://gist.github.com/Harshkumar77/af4dec9cc2e13ef35442aafe202acac4.js"></script>`
  )
})
