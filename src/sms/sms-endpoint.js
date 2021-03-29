import { smsBodyObjectSchema } from "./sms-validation"
import makeHttpError from "../helpers/http-error"
import { ValidationError } from "joi"
import { ObjectID } from "mongodb"

export default function makeSmsEndpointHandler({ smsRepository, sendSms }) {
  return async function handle(httpRequest) {
    switch (httpRequest.method) {
      case "POST":
        return postSms(httpRequest)

      case "GET":
        return getSms(httpRequest)

      default:
        return makeHttpError({
          statusCode: 405,
          errorMessage: `${httpRequest.method} method not allowed.`,
        })
    }
  }

  async function getSms(httpRequest) {
    const { id } = httpRequest.pathParams || {}
    const { offset, limit, appName, smsService, status } =
      httpRequest.queryParams || {}

    let result
    if (id) {
      if (!ObjectID.isValid(id)) {
        return makeHttpError({
          statusCode: 400,
          errorMessage: "Invalid id in parameter.",
        })
      }
      const _id = ObjectID(id)
      result = await smsRepository.findById({ _id })
    } else {
      const query = {}
      if (appName) {
        query.appName = appName
      }
      if (smsService) {
        query.smsService = smsService
      }
      if (status) {
        query.status = status
      }

      result = await smsRepository.find({ query, offset, limit })
    }

    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      data: JSON.stringify(result),
    }
  }

  async function postSms(httpRequest) {
    let smsInfo = httpRequest.body
    if (!smsInfo) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: "Bad request. POST body must be valid JSON.",
      })
    }

    if (typeof httpRequest.body === "string") {
      try {
        smsInfo = JSON.parse(smsInfo)
      } catch {
        return makeHttpError({
          statusCode: 400,
          errorMessage: "Bad request. POST body must be valid JSON.",
        })
      }
    }

    try {
      smsInfo = await smsBodyObjectSchema.validateAsync(smsInfo)

      const sentResult = await sendSms(
        smsInfo.smsService,
        smsInfo.countryCode,
        smsInfo.mobileNo,
        smsInfo.messageBody
      )
      console.log({ sentResult: JSON.stringify(sentResult) })
      const result = await smsRepository.add({
        ...smsInfo,
        sentFrom: sentResult.from,
      })
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 201,
        data: JSON.stringify(result),
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        return makeHttpError({
          errorMessage: error.message,
          statusCode: 400,
        })
      }
      return makeHttpError({
        errorMessage: error.message,
        statusCode: 500,
      })
    }
  }
}
