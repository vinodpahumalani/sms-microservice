import express from "express"
const router = express.Router()
import makeDb from "../db"
import adaptRequest from "../helpers/adapt-request"
import makeSmsRepository from "./sms-repository"
import smsEndpoinsHandler from "./sms-endpoint"
import sendSms from "./send-sms"

const database = makeDb()
const smsRepository = makeSmsRepository({ database })
export const handleSmsRequest = smsEndpoinsHandler({ smsRepository, sendSms })

router
  .route("/")
  // /v1/sms - handles all the sms related operations
  .all(smsController)
router
  .route("/:id")
  // /v1/sms - handles all the sms related operations
  .all(smsController)

function smsController(req, res) {
  const httpRequest = adaptRequest(req)
  handleSmsRequest(httpRequest)
    .then(({ headers, statusCode, data }) =>
      res.set(headers).status(statusCode).send(data)
    )
    .catch((e) => {
      res.status(500).end()
      throw e
    })
}

export const smsRoutes = router
