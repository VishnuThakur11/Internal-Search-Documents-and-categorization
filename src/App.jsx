import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { BrowserRouter, Route , Routes} from 'react-router-dom'
import SignIn from './auth/Signin'
import SignUp from './auth/SignUp'
const App = () => {
  return (
    <>
    <BrowserRouter>
    <Navbar />

    <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>

      </BrowserRouter>
    </>
  )
}

export default App