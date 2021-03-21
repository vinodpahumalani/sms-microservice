import faker from "faker";
import Sms from "../../src/sms/sms";

export default fakeSms(spec ={}) {
    return Sms({
        appName: faker.company.companyName,
        sendTo: Number(faker.phone.phoneNumber("XXXXXXXXXX")),
        countryCode: "+91",
        messageBody: faker.lorem.sentence,
        smsService: "Twilio"

    })
}