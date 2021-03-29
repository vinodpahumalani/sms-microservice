import Joi from "joi"

export const smsDbObjectSchema = Joi.object({
  _id: Joi.any().required(),
  appName: Joi.string().min(2).required(),
  sentFrom: Joi.string().min(2).required(),
  countryCode: Joi.string().valid("+91", "+1", "+49").required(),
  mobileNo: Joi.number().min(6000000000).max(9999999999).required(),
  messageBody: Joi.string().required(),
  smsService: Joi.string().valid("twilio", "nexmo").required().insensitive(),
  date: Joi.date().required(),
  status: Joi.number().min(0).max(1).required().default(0),
})

export const smsBodyObjectSchema = Joi.object({
  appName: Joi.string().min(2).required().messages({
    "any.required": "appName cannot be empty",
    "string.min": "appName should contain 2 or more characters",
  }),
  countryCode: Joi.string().valid("+91", "+1", "+49").required().messages({
    "any.required": "countryCode cannot be empty",
    "any.only": "Supported country codes are '+91', '+1' and '+49'",
  }),
  mobileNo: Joi.number().min(6000000000).max(9999999999).required().messages({
    "any.required": "mobileNo cannot be empty",
    "number.min": "Invalid mobile number",
  }),
  messageBody: Joi.string().required().messages({
    "any.required": "messageBody cannot be empty",
  }),
  smsService: Joi.string()
    .valid("twilio", "nexmo")
    .required()
    .insensitive()
    .messages({
      "any.required": "smsService cannot be empty",
      "any.only":
        'We only support sending sms by these services: "twilio", "nexmo", "plivo", "snich", "telnyx"',
    }),
})
