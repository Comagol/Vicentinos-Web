import { Routes, Route } from 'react-router-dom'
import Login from '../views/Login'
import PaymentStatus from '../views/PaymentStatus'
import MemberCard from '../views/MemberCard'
import News from '../views/News'

const AppRoutes = () => {
    return (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/member-card" element={<MemberCard />} />
        <Route path='/news' element={<News/>} />
        <Route path='/payment-status' element={<PaymentStatus/>} />
    </Routes>
    )
}

export default AppRoutes    