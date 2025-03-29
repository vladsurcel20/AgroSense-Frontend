import {Routes, Route} from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'sonner';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <>
      <Toaster position="top-right" richColors />
      <AuthProvider>
        <Routes>
          <Route path='/auth' element={<AuthPage />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path="*" element={<AuthPage />} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
