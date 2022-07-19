import express, { Request, Response } from "express"
export const clientRouter = express.Router()

function sendClientCode(req: Request, res: Response) {
  res.sendFile("build/index.html")
}

clientRouter.get("/", sendClientCode)
clientRouter.get("/url/:id", sendClientCode)
