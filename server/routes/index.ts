import { Express } from "express"
import { authRouter } from "./auth.route"
import { clientRouter } from "./client.route"
import { redirectRouter } from "./redirect.route"
import { urlRouter } from "./url.route"
const addRoutes = (app: Express) => {
  app.use(authRouter)
  app.use(urlRouter)
  app.use(redirectRouter)
  app.use(clientRouter)

}
export default addRoutes
