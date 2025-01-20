import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import { ChatPage } from '../pages/ChatPage'

const AppRouter = () => (
    <Routes>
        {/* Redireccion a / */}
        <Route path="*" element={<Navigate to="/auth/login" />} />

        {/* Login */}
        <Route path='/auth/login' element={<LoginPage />} />

        {/* Chat Page */}
        <Route path='/chat' element={<ChatPage/>} />
    </Routes>
)

export default AppRouter