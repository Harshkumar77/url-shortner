import express from 'express'
import passport from 'passport';
import jwt, { JwtPayload } from 'jsonwebtoken'
import { verifyUser } from '../middleware/auth';

export const authRouter = express.Router()

const refreshTokens: string[] = []

const { JWT_KEY } = process.env

authRouter.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'], session: false }));

authRouter.get("/auth/callback",
    passport.authenticate("google", {
        session: false
    }),
    (req, res) => {

        if (!req.user) {
            res.status(500)
            return
        }
        const refreshToken = jwt.sign({
            id: req.user.id,
        }, process.env.JWT_KEY as string, {
            expiresIn: '10min'
        })

        refreshTokens.push(refreshToken)

        res.cookie("refreshToken", refreshToken, {
            secure: true,
            httpOnly: true,
        })
        res.send("hello")
    }
);

authRouter.get('/auth/user', verifyUser, (req, res) => {
    res.send(req.user)
})

authRouter.post('/auth/access_token', (req, res) => {
    try {
        const jwtResult = jwt.verify(req.cookies.refreshToken, JWT_KEY as string) as JwtPayload
        const access_token = jwt.sign({ id: jwtResult.id }, JWT_KEY as string)
        res.json({ access_token })
    } catch (error: any) {
        res.send(error).status(400)
    }
})