import { TouchableOpacityProps } from 'react-native'
import { Container, ButtonIconTypeStyleProps, Icon } from './styles'
import { MaterialIcons } from '@expo/vector-icons'

type ButtonProps = TouchableOpacityProps & {
  type?: ButtonIconTypeStyleProps
  icon?: keyof typeof MaterialIcons.glyphMap
}

export function ButtonIcon({ icon = 'home', type = 'PRIMARY' }: ButtonProps) {
  return (
    <Container>
      <Icon name={icon} type={type} />
    </Container>
  )
}
