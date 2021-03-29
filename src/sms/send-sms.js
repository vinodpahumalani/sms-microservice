import nexmo from "../nexmo"
import twilio from "../twilio"
import requiredParam from "../helpers/required-param"

const smsService = { nexmo, twilio }

/**
 * SMS will be sent with the `service`
 * which is passed in the parameter
 * @param {String} service - Type of service can be `nexmo` or `twilio`
 * @param {String} countryCode - country code of country
 * @param {String} mobile - 10 digit mobile number
 * @param {String} message - message will have message body
 * @returns {*} response of sms Service
 */
export default function sendSmsWith(
  service = requiredParam("service"),
  countryCode = requiredParam("coutryCode"),
  mobile = requiredParam("mobile"),
  message = requiredParam("message")
) {
  const sentFrom = `TX-${service.toUpperCase()}`
  const sendSms = smsService[service]
  return sendSms(sentFrom, countryCode, mobile, message)
}
