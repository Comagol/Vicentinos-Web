import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import AppRoutes from './routes/routes'
import Footer from './components/Footer'
import { Flex } from '@chakra-ui/react'

function App() {
  return (
    <ThemeProvider>
      <Flex direction="column" minH="100vh" flex="1">
      <Navbar />
      <Flex as="main" flex="1" direction="column">
      <AppRoutes />
      </Flex>
      <Footer />
      </Flex>
    </ThemeProvider>
  )
}

export default App
