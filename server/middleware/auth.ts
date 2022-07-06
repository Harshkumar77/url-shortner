import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"

const { JWT_KEY } = process.env
if (!JWT_KEY)
    throw Error("Check enviornment variables")

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const jwtResult = jwt.verify(req.cookies.accessToken, JWT_KEY) as JwtPayload
        req.user = { id: jwtResult.id }
        next()
    } catch (error: any) {
        res.send(error).status(400)
    }
}