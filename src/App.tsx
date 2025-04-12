import {Routes, Route, Navigate} from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'sonner';
import Dashboard from './pages/Dashboard';
import LocationsGrid from './components/LocationsGrid';
import GreenhousesGrid from './components/GreenhousesGrid';
import ControlsGrid from './components/ControlsGrid';
import { DashboardProvider } from './contexts/DashboardContext';

const App = () => {
  return (
    <>
      <Toaster position="top-right" richColors />
      <AuthProvider>
        <Routes>
          <Route path='/auth' element={<AuthPage />} />
          <Route path='/dashboard' element={
            <DashboardProvider>
              <Dashboard />
            </DashboardProvider>
          } >
            <Route index element={<Navigate to="location" replace />} />
            <Route path="location" element={<LocationsGrid />} />
            <Route path="location/greenhouse" element={<GreenhousesGrid />} />
            <Route path="location/greenhouse/sensors" element={<ControlsGrid />} />
            <Route path="*" element={<Navigate to="/dashboard/location" replace />} />
          </Route>
          <Route path="*" element={<AuthPage />} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
