import { Express } from "express"
import { authRouter } from "./auth.route"
import { redirectRouter } from "./redirect.route"
import { urlRouter } from "./url.route"
const addRoutes = (app: Express) => {
  app.use(authRouter)
  app.use(urlRouter)
  app.use(redirectRouter)
}
export default addRoutes
