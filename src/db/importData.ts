import { Optional } from "sequelize"
import { Character } from "../models/Character"
import { CharacterDto, rickMortyService } from "../services/RickMortyService"


export async function fillCharactersTable() {
  try {
    const all = await rickMortyService.getAllCharacters()
    const rows = toEntities(all)
    await upload(rows)
  }
  catch (e) {
    const err = e as Error
    console.error(err.message)
  }
}


type EntityData = Optional<Character, keyof Character>


function toEntities(dto: CharacterDto[]): EntityData[] {
  return dto.map(obj => ({
    name: obj.name,
    data: obj
  }))
}


async function upload(rows: EntityData[]) {

  const count = await Character.count()
  if (count > 0) {
    await Character.destroy({ truncate: true })
  }

  await Character.bulkCreate(rows)
}
