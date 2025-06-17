import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import AppRoutes from './routes/routes'
import Footer from './components/Footer'

function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <AppRoutes />
      <Footer />
    </ThemeProvider>
  )
}

export default App
