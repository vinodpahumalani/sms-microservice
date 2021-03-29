import Nexmo from "nexmo"

const nexmo = new Nexmo({
  apiKey: process.env.NEXMO_API_KEY,
  apiSecret: process.env.NEXMO_API_SECRET,
})

/**
 * sends SMS using nexmo
 * @param {String} from - sender identity
 * @param {String} countryCode - country code of country
 * @param {String} mobile - 10 digit mobile number
 * @param {String} message - message will have message body
 * @returns {*} response of nexmo
 */
export default function sendSms(from, countryCode, mobile, message) {
  const to = countryCode.replace("+", "") + mobile
  return new Promise((resolve, reject) => {
    // nexmo.message.sendSms(from, to, message, (error, response) => {
    //   if (error) {
    // reject(error)
    // } else {
    resolve({
      from,
      countryCode,
      mobile,
      message,
    })
    //   }
    // })
  })
}
