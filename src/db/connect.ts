import { Sequelize } from 'sequelize-typescript'
import { SequelizeScopeError } from 'sequelize'
import fs from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { Character } from '../models/Character'


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


const crt = fs.readFileSync(join(__dirname, 'certificate/root.crt'))

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'rc1b-r21uoagjy1t7k77h.mdb.yandexcloud.net',
  port: 6432,
  database: 'db1',
  username: 'candidate',
  password: '62I8anq3cFq5GYh2u4Lh',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true,
      ca: crt.toString()
    }
  }
})

applyModels(sequelize)


const log = console.log

export async function connectToDB() {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    log('Connection to DB has been successfully established')
  }
  catch (e) {
    log('Unable to connect: ', (e as SequelizeScopeError).message)
  }
}


export function applyModels(conn: Sequelize) {
  conn.addModels([
    Character
  ])
}
