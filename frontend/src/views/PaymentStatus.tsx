import { theme } from "../theme/theme"

const PaymentStatus = () => {
  return (
    <div>
      <h1 style={{ color: theme.colors.primary }}>Estado de pago</h1>
      <p style={{ color: theme.colors.secondary }}>El estado de pago es: aqui ira el status</p>
    </div>
  )
}

export default PaymentStatus