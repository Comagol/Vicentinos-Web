import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import AppRoutes from './routes/routes'

function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <AppRoutes />
    </ThemeProvider>
  )
}

export default App
