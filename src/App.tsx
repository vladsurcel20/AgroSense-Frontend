import React from 'react';
import {Routes, Route} from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import { AuthProvider } from './contexts/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/auth' element={<AuthPage />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
