import express, { Request, Response } from "express"
export const clientRouter = express.Router()

function sendClientCode(req: Request, res: Response) {
  res.sendFile("dist/index.html")
}

function sendAdditionalCode(req: Request, res: Response) {
  res.sendFile(`dist/${req.params.file}`)
}

clientRouter.get("/", sendClientCode)
clientRouter.get("/url/:id", sendClientCode)
clientRouter.get("/assets/:file", sendAdditionalCode)
