import express, { Request, Response } from "express"
export const clientRouter = express.Router()

clientRouter.use("/" , express.static("dist"))
clientRouter.use("/url/:id" , express.static("dist"))

