import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { ButtonIcon } from '@components/ButtonIcon'
import { Container, Form, HeaderList, NumberOfPlayers } from './styles'
import { Input } from '@components/Input'
import { Filter } from '@components/Filter'
import { Alert, FlatList, TextInput } from 'react-native'
import { useState, useEffect, useRef } from 'react'
import { PlayerCard } from '@components/PlayerCard'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'
import { useRoute, useNavigation } from '@react-navigation/native'
import { AppError } from '@utils/AppError'
import { playerAddByGroup } from '@storage/player/playerAddByGroup'
import { playersGetByGroupAndTeam } from '@storage/player/playerGetByGroupAndTeam'
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO'
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup'
import { groupRemoveByName } from '@storage/group/groupRemoveByName'
import { Loading } from '@components/Loading'

type RouteParams = {
  group: string
}

export function Players() {
  const [isLoading, setIsLoading] = useState(false)
  const [newPlayerName, setNewPlayerName] = useState('')
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

  const navigation = useNavigation()
  const route = useRoute()
  const { group } = route.params as RouteParams

  const newPlayerNameInputRef = useRef<TextInput>(null)

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert(
        'Nova pessoa',
        'Informe o nome da pessoa para adicionar',
      )
    }
    const newPlayer = {
      name: newPlayerName,
      team,
    }
    try {
      await playerAddByGroup(newPlayer, group)
      fetchPlayersByTeam()
      newPlayerNameInputRef.current?.blur()
      setNewPlayerName('')
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Nova pessoa', error.message)
      } else {
        Alert.alert('Nova pessoa', 'Não foi possível adicionar jogador')
      }
      throw error
    }
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true)
      const playersByTeam = await playersGetByGroupAndTeam(group, team)
      setPlayers(playersByTeam)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      Alert.alert(
        'Jogadores',
        ' Não foi possível carregar os jogadores desse Time',
      )
    }
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group)
      navigation.navigate('groups')
    } catch (error) {
      console.log(error)
      Alert.alert('Remover a turma', 'Não foi possível remover a turma.')
    }
  }

  async function handleGroupRemove() {
    Alert.alert('Remover a turma', 'Deseja remover esta turma?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Remover', onPress: () => groupRemove() },
    ])
  }

  async function handlePlayerRemove(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group)
      fetchPlayersByTeam()
    } catch (error) {
      console.log(error)
      Alert.alert('Remover pessoa', 'Não foi possível remover essa pessoa')
    }
  }

  useEffect(() => {
    fetchPlayersByTeam()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [team])

  return (
    <Container>
      <Header showBackButton />
      <Highlight title={group} subtitle="adicione a galera e separe os times" />
      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Nome do jogador"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>
      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <NumberOfPlayers> {players.length}</NumberOfPlayers>
      </HeaderList>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => {
                handlePlayerRemove(item.name)
              }}
            />
          )}
          ListEmptyComponent={() => (
            <ListEmpty message="Não há jogadores nesse time" />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            { paddingBottom: 100 },
            players.length === 0 && { flex: 1 },
          ]}
        />
      )}
      <Button
        title="Remover turma"
        type="SECONDARY"
        onPress={handleGroupRemove}
      />
    </Container>
  )
}
