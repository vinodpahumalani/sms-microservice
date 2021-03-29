import express from "express"
import logger from "morgan"
import swaggerUi from "swagger-ui-express"
import swaggerDocument from "./swagger.json"

import smsRoutes from "./sms"
console.log(process.env.TWILIO_ACCOUNT_SID)

let app = express()
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

smsRoutes(app)

module.exports = app
