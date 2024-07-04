import { connectToDB } from "./db/connect"
import { fillCharactersTable } from "./db/importData"


async function startApp() {
  await connectToDB()
  await fillCharactersTable()
}


startApp()
