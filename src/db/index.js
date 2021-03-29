import mongodb from "mongodb"

export default async function makeDb() {
  const { MongoClient } = mongodb
  const url = "mongodb://localhost:27019"
  const dbName = "sms_microservice"
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  await client.connect()
  const db = client.db(dbName)
  return db
}
