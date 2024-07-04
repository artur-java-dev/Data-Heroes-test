import { getCharacter } from "rickmortyapi"


const statusOK = 200
const allCharactersCount = 826

const allCharactersID =
  Array(allCharactersCount)
    .fill(0)
    .map((_, i) => i + 1)


class RickMortyService {

  public async getAllCharacters(): Promise<CharacterDto[]> {
    const response = await getCharacter(allCharactersID)

    if (response.status !== statusOK) {
      const msg = response.statusMessage
      throw Error(
        `Не удалось получить данные:
         ${msg} (код ответа - ${response.status})`
      )
    }

    const data = response.data

    return data
  }

}


type Status = 'Dead' | 'Alive' | 'unknown'

type Gender = 'Female' | 'Male' | 'Genderless' | 'unknown'

export type CharacterDto = {
  id: number
  name: string
  url: string
  created: string
  status: Status
  species: string
  type: string
  gender: Gender
  origin: Location
  location: Location
  image: string
  episode: string[]
}

export type Location = {
  name: string
  url: string
}


export const rickMortyService = new RickMortyService
