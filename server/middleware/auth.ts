import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"

const { JWT_KEY } = process.env

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers['authorization']) {
        res.status(400).json({ "message": "no authorization header provided" })
        return
    }
    if (!req.headers['authorization'].startsWith("Bearer ")) {
        res.status(400).json({ "message": "provide authorization properly" })
        return
    }

    const access_token = req.headers['authorization'].split(" ").pop() as string

    try {
        const jwtResult = jwt.verify(access_token, JWT_KEY as string) as JwtPayload
        req.user = { id: jwtResult.id }
        next()
    } catch (error: any) {
        res.status(400).send(error)
    }
}