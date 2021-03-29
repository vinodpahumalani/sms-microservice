import { smsDbObjectSchema } from "./sms-validation"
/**
 * validates sms has all the properties
 * @returns {Object} sms
 * @param {Object} smsInfo - sms object
 */
export default function sms(smsInfo) {
  const validSmsInfo = validate(smsInfo)
  const normalizedSms = normalize(validSmsInfo.value)

  return Object.freeze(normalizedSms)

  function validate(smsInfo) {
    let validSms = smsDbObjectSchema.validate(smsInfo)
    if (validSms.error) {
      throw validSms.error
    }
    return validSms
  }

  function normalize({ appName, smsService, mobileNo, ...otherObjects }) {
    return {
      ...otherObjects,
      appName: appName.toLowerCase(),
      smsService: smsService.toLowerCase(),
      mobileNo: mobileNo.toString(),
    }
  }
}
