import Twilio from "twilio"

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

const client = Twilio(accountSid, authToken)

/**
 * sends SMS using twilio
 * @param {String} from - sender identity
 * @param {String} countryCode - country code of country
 * @param {String} mobile - 10 digit mobile number
 * @param {String} message - message will have message body
 * @returns {*} response of twilio
 */
export default async function sendSms(from, coutryCode, mobile, message) {
  try {
    const to = coutryCode + mobile
    const response = await client.messages.create(from, message, to)
    if (response.account_sid)
      return {
        from,
        coutryCode,
        mobile,
        message,
      }
  } catch (error) {
    throw error
  }
}
