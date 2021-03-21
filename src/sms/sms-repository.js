import sms from "./sms"

export default function makeSms({ database }) {
  return Object.freeze({
    add,
    // findByMobileNo,
    findById,
    find,
    // findBySmsService,
    // update,
    // remove
  })

  async function add({ smsInfo }) {
    try {
      const db = await database
      const sms = {
        ...smsInfo,
        date: Date.now(),
        status: 0,
      }
      const { result, ops } = await db.collection("sms").insert(sms)

      return {
        success: result.acknowledge,
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

  async function find({ query, offset, limit }) {
    try {
      const db = await database
      const smsRecords = await db
        .collection("sms")
        .find(query)
        .skip(offset ?? 0)
        .limit(limit ?? 10)
        .toArray()

      return {
        success: true,
        result: smsRecords.map((smsRecord) => documentToSms(smsRecord)),
      }
    } catch (error) {
      throw error
    }
  }

  function documentToSms(document) {
    return sms(document)
  }
}
