import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { BrowserRouter, Route , Routes} from 'react-router-dom'
import SignIn from './auth/Signin'
import SignUp from './auth/SignUp'
import Dashboard from './components/Dashboard'
import { AuthProvider } from './auth/AuthContext'
const App = () => {
  return (
    <>
    <BrowserRouter>
    <AuthProvider>
    <Navbar />

    <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
</AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App