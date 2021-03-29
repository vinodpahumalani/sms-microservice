import sms from "./sms"

export default function makeSms({ database }) {
  return Object.freeze({
    add,
    findById,
    find,
    // update,
    remove,
  })

  async function add({ ...smsInfo }) {
    try {
      const db = await database
      const sms = {
        ...smsInfo,
        date: Date.now(),
        status: 0,
        sentFrom: `TX-${smsInfo.smsService.toUpperCase()}`,
      }
      const { insertedCount, ops } = await db.collection("sms").insertOne(sms)

      return {
        success: insertedCount == 1,
        created: documentToSms(ops[0]),
      }
    } catch (error) {
      throw error
    }
  }

  async function findById({ _id }) {
    try {
      const db = await database
      const result = await db.collection("sms").findOne({ _id })

      return {
        success: true,
        result: documentToSms(result),
      }
    } catch (error) {
      throw error
    }
  }

  async function find({ query = {}, offset = 0, limit = 10 } = {}) {
    try {
      const db = await database
      const smsRecords = await db
        .collection("sms")
        .find(query)
        .skip(offset)
        .limit(limit)
        .toArray()

      return {
        success: true,
        result: smsRecords.map((smsRecord) => documentToSms(smsRecord)),
      }
    } catch (error) {
      throw error
    }
  }

  async function remove(query = {}) {
    try {
      const db = await database
      const { deletedCount } = await db.collection("sms").deleteMany(query)
      return deletedCount
    } catch (error) {
      throw error
    }
  }

  function documentToSms(document) {
    return sms(document)
  }
}
