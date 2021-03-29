import { expect } from "chai"
import makeDb from "../src/db"
import smsRepository from "../src/sms/sms-repository"
import fakeSms from "./fixtures/fake-sms"

const database = makeDb()
const smsRepo = smsRepository({ database })

describe("Create SMS", () => {
  before(() => smsRepo.remove())
  it("adds SMS into database", async () => {
    const dummyData = fakeSms()
    const result = await smsRepo.add({ smsInfo: dummyData })
    expect(result.success).to.be.true
    expect(result.created).haveOwnProperty("_id")
    expect(result.created).haveOwnProperty("sentFrom")
    expect(result.created).haveOwnProperty("date")
    return await smsRepo.remove(dummyData)
  })

  it("removes SMS", async () => {
    const fakeSMS = fakeSms()
    await smsRepo.add({ smsInfo: fakeSMS })
    expect(await smsRepo.remove(fakeSMS)).to.be.equals(1)
  })

  it("lists SMS", async () => {
    const fake1 = smsRepo.add({ smsInfo: fakeSms() })
    const fake2 = smsRepo.add({ smsInfo: fakeSms() })
    const fake3 = smsRepo.add({ smsInfo: fakeSms() })
    const fakes = await Promise.all([fake1, fake2, fake3])
    const { result } = await smsRepo.find()
    expect(result.length).to.be.equals(3)
    await smsRepo.remove()
  })

  it("supports limit", async () => {
    const fake1 = smsRepo.add({ smsInfo: fakeSms() })
    const fake2 = smsRepo.add({ smsInfo: fakeSms() })
    const fake3 = smsRepo.add({ smsInfo: fakeSms() })
    const fakes = await Promise.all([fake1, fake2, fake3])
    const { result } = await smsRepo.find({ limit: 2 })
    expect(result.length).to.be.equals(2)
    await smsRepo.remove()
  })

  it("supports pagination", async () => {
    const fake1 = smsRepo.add({ smsInfo: fakeSms() })
    const fake2 = smsRepo.add({ smsInfo: fakeSms() })
    const fake3 = smsRepo.add({ smsInfo: fakeSms() })
    const fake4 = smsRepo.add({ smsInfo: fakeSms() })
    const fakes = await Promise.all([fake1, fake2, fake3, fake4])

    const pageResult1 = await smsRepo.find({ limit: 2 })

    expect(pageResult1.result[0]._id.toString()).to.be.equals(
      fakes[0].created._id.toString()
    )
    const pageResult2 = await smsRepo.find({ offset: 2, limit: 2 })

    expect(pageResult2.result[0]._id.toString()).to.be.equals(
      fakes[2].created._id.toString()
    )

    await smsRepo.remove()
  })

  it("supports find SMS by id", async () => {
    const fake1 = smsRepo.add({ smsInfo: fakeSms() })
    const fake2 = smsRepo.add({ smsInfo: fakeSms() })
    const fake3 = smsRepo.add({ smsInfo: fakeSms() })
    const fake4 = smsRepo.add({ smsInfo: fakeSms() })
    const fakes = await Promise.all([fake1, fake2, fake3, fake4])

    const { result } = await smsRepo.findById({ _id: fakes[2].created._id })

    expect(result._id.toString()).to.be.equals(fakes[2].created._id.toString())
    await smsRepo.remove()
  })
})
