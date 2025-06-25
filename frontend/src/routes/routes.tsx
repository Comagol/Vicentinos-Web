import { Routes, Route } from 'react-router-dom'
import Login from '../views/Login'
import Contact from '../views/Contact'
import MemberCard from '../views/MemberCard'
import News from '../views/News'
import Home from '../views/Home'
import Register from '../views/register'

const AppRoutes = () => {
    return (
    <Routes>
        <Route path="/" element={<Home />} />   
        <Route path="/login" element={<Login />} />
        <Route path="/member-card" element={<MemberCard />} />
        <Route path='/news' element={<News/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/register' element={<Register/>} />
    </Routes>
    )
}

export default AppRoutes    