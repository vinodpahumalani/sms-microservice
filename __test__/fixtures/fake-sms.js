import faker from "faker"

export default function fakeSms() {
  return {
    appName: faker.company.companyName(),
    mobileNo: faker.random.number({ min: 6000000000, max: 9999999999 }),
    countryCode: ["+91", "+1", "+49"][faker.random.number(2)],
    messageBody: faker.lorem.sentence(),
    smsService: ["twilio", "nexmo", "plivo", "snich", "telnyx"][
      faker.random.number(4)
    ],
  }
}
