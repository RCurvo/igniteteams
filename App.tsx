import { ThemeProvider } from 'styled-components/native'
import {
  useFonts,
  Roboto_400Regular as robotoRegular,
  Roboto_700Bold as robotoBold,
} from '@expo-google-fonts/roboto'
import theme from './src/theme'
import { StatusBar } from 'react-native'

import { Loading } from '@components/Loading'
import { Players } from '@screens/Players'

export default function App() {
  const [fontsLoaded] = useFonts({ robotoRegular, robotoBold })
  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Players /> : <Loading />}
    </ThemeProvider>
  )
}
