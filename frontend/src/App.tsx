import React, { ReactNode } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'

function Protected({ children }: { children: ReactNode }) {
  return localStorage.getItem('token')
    ? <>{children}</>
    : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/*"
        element={
          <Protected>
            <DashboardPage />
          </Protected>
        }
      />
    </Routes>
  )
}
