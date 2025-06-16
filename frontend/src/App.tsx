import { ThemeProvider } from './context/ThemeContext'
import AppRoutes from './routes/routes'

function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  )
}

export default App
