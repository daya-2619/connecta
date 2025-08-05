import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProfilePages from './pages/ProfilePages.jsx'
import { Toaster } from 'react-hot-toast'
import { AuthContext } from './context/AuthContext.jsx'

const App = () => {
  const { authUser } = useContext(AuthContext)
  return (
    <div className="bg-[url('./bgImage.svg')] bg-contain ">
      <Toaster />
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path='/profile' element={authUser ? <ProfilePages /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

export default App
