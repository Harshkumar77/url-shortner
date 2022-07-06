import { Express } from "express"
import { authRouter } from "./auth.route"
const addRoutes = (app: Express) => {
    app.use(authRouter)
}
export default addRoutes