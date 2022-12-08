/* eslint-disable no-undef */
import { Container } from './styles'
import { TextInput, TextInputProps } from 'react-native'
import { useTheme } from 'styled-components/native'

type InputProps = TextInputProps & {
  inputRef?: React.RefObject<TextInput>
}

export function Input({ inputRef, ...rest }: InputProps) {
  const { COLORS } = useTheme()
  return (
    <Container
      ref={inputRef}
      {...rest}
      placeholderTextColor={COLORS.GRAY_300}
    />
  )
}
