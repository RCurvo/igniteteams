import AsyncStorage from '@react-native-async-storage/async-storage'
import { GROUP_COLLECTION } from '@storage/storageConfig'
import { G } from 'react-native-svg'

export async function groupsGetAll() {
  try {
    const storage = await AsyncStorage.getItem(GROUP_COLLECTION)

    const groups: string[] = storage ? JSON.parse(storage) : []
    return groups
  } catch (error) {
    console.log(error)
    throw error
  }
}
