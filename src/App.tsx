import {Routes, Route} from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'sonner';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <>
      <Toaster position="top-left" richColors />
      <AuthProvider>
        <Routes>
          <Route path='/auth' element={<AuthPage />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
