import "../environment"
import { expect } from "chai"
import { handleSmsRequest } from "./sms.routes"

describe("Send SMS", () => {
  const body = {
    appName: "Trip Advisor",
    countryCode: "+91",
    mobileNo: 8866142011,
    messageBody: "lorem ipsum dolar amet at",
    smsService: "nexmo",
  }
  it("will NOT send SMS without app name.", async () => {
    const postData = { ...body }
    delete postData.appName
    const result = await handleSmsRequest({
      method: "POST",
      body: {
        countryCode: "+91",
        mobileNo: 8866142011,
        messageBody: "lorem ipsum dolar amet at",
        smsService: "nexmo",
      },
    })
    expect(result).deep.equals({
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 400,
      data: JSON.stringify({
        success: false,
        error: "appName cannot be empty",
      }),
    })
  })
  it("will NOT send SMS without mobile number.", async () => {
    const postData = { ...body }
    delete postData.mobileNo
    const result = await handleSmsRequest({
      method: "POST",
      body: {
        appName: "Trip Advisor",
        countryCode: "+91",
        messageBody: "lorem ipsum dolar amet at",
        smsService: "nexmo",
      },
    })
    expect(result).deep.equals({
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 400,
      data: JSON.stringify({
        success: false,
        error: "mobileNo cannot be empty",
      }),
    })
  })
  it("will NOT send SMS without country code.", async () => {
    const postData = { ...body }
    delete postData.countryCode
    const result = await handleSmsRequest({
      method: "POST",
      body: postData,
    })
    expect(result).deep.equals({
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 400,
      data: JSON.stringify({
        success: false,
        error: "countryCode cannot be empty",
      }),
    })
  })
  it("will NOT send SMS without message body.", async () => {
    const postData = { ...body }
    delete postData.messageBody
    const result = await handleSmsRequest({
      method: "POST",
      body: postData,
    })
    expect(result).deep.equals({
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 400,
      data: JSON.stringify({
        success: false,
        error: "messageBody cannot be empty",
      }),
    })
  })
  it("will NOT send SMS without sms service.", async () => {
    const postData = { ...body }
    delete postData.smsService
    const result = await handleSmsRequest({
      method: "POST",
      body: postData,
    })
    expect(result).deep.equals({
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 400,
      data: JSON.stringify({
        success: false,
        error: "smsService cannot be empty",
      }),
    })
  })
  it("will NOT send SMS with invalid app name.", async () => {
    const postData = { ...body }
    postData.appName = "a"
    const result = await handleSmsRequest({
      method: "POST",
      body: postData,
    })
    expect(result).deep.equals({
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 400,
      data: JSON.stringify({
        success: false,
        error: "appName should contain 2 or more characters",
      }),
    })
  })

  it("will NOT send SMS with invalid mobile no.", async () => {
    const postData = { ...body }
    postData.mobileNo = 12345
    const result = await handleSmsRequest({
      method: "POST",
      body: postData,
    })
    expect(result).deep.equals({
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 400,
      data: JSON.stringify({
        success: false,
        error: "Invalid mobile number",
      }),
    })
  })

  it("will NOT send SMS with invalid unsupported country codes.", async () => {
    const postData = { ...body }
    postData.countryCode = "+52"
    const result = await handleSmsRequest({
      method: "POST",
      body: postData,
    })
    expect(result).deep.equals({
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 400,
      data: JSON.stringify({
        success: false,
        error: "Supported country codes are '+91', '+1' and '+49'",
      }),
    })
  })

  it("will NOT send SMS with invalid unsupported sms services.", async () => {
    const postData = { ...body }
    postData.smsService = "Loxuio"
    const result = await handleSmsRequest({
      method: "POST",
      body: postData,
    })
    expect(result).deep.equals({
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 400,
      data: JSON.stringify({
        success: false,
        error:
          'We only support sending sms by these services: "twilio", "nexmo", "plivo", "snich", "telnyx"',
      }),
    })
  })

  it("will NOT fetch SMS details with invalid id.", async () => {
    const parameter = { id: "56dfgtyhugfncjdh45shjdk" }
    const result = await handleSmsRequest({
      method: "GET",
      pathParams: parameter,
    })
    expect(result).deep.equals({
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 400,
      data: JSON.stringify({
        success: false,
        error: "Invalid id in parameter.",
      }),
    })
  })
})
