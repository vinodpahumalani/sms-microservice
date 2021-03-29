import { config } from "dotenv"
import { join } from "path"
const envPath = join(
  __dirname,
  `../env/.env.${process.env.NODE_ENV.replace(" ", "")}`
)
config({ path: envPath })
