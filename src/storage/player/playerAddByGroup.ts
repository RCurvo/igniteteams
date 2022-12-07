import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppError } from '@utils/AppError'
import { PLAYERS_COLLECTION } from '@storage/storageConfig'
import { PlayerStorageDTO } from './PlayerStorageDTO'
import { playersGetByGroup } from './playersGetByGroup'

export async function playerAddByGroup(
  newPlayer: PlayerStorageDTO,
  group: string,
) {
  try {
    const storedPlayers = await playersGetByGroup(group)

    const PlayerAlreadyExists = storedPlayers.filter(
      (player) => player.name === newPlayer.name,
    )

    if (PlayerAlreadyExists.length > 0) {
      throw new AppError('Essa pessoa já está adicionada em um time aqui.')
    }

    const storage = JSON.stringify([...storedPlayers, newPlayer])

    await AsyncStorage.setItem(`${PLAYERS_COLLECTION}-${group}`, storage)
  } catch (error) {
    console.log(error)
    throw error
  }
}
