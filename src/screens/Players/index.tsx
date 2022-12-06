import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { ButtonIcon } from '@components/ButtonIcon'
import { Container, Form } from './styles'
import { Input } from '@components/Input'
import { Filter } from '@components/Filter'

export function Players() {
  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title="Nome da turma"
        subtitle="adicione a galera e separe os times"
      />
      <Form>
        <Input placeholder="Nome do jogador" autoCorrect={false} />
        <ButtonIcon icon="add" type="PRIMARY" />
      </Form>
      <Filter title="Time A" isActive={true} />
      <Filter title="Time B" />
    </Container>
  )
}
