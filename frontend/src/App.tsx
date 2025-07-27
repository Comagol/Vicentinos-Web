import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import AppRoutes from './routes/routes'
import Footer from './components/Footer'
import { Flex } from '@chakra-ui/react'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
      <Flex direction="column" minH="100vh" flex="1">
      <Navbar />
      <Flex as="main" flex="1" direction="column">
      <AppRoutes />
      </Flex>
      <Footer />
      </Flex>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
