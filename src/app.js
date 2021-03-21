import express from "express"
import path from "path"
import cookieParser from "cookie-parser"
import logger from "morgan"
import smsRoutes from "./sms"

let app = express()

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

smsRoutes(app)

module.exports = app
