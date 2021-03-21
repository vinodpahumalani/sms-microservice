import { smsRoutes } from "./sms.routes"

export default (app) => {
  app.use("/sms", smsRoutes)
}
