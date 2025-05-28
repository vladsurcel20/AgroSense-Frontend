import {Routes, Route, Navigate} from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'sonner';
import Dashboard from './pages/Dashboard';
import LocationsGrid from './components/dashboard/LocationsGrid';
import GreenhousesGrid from './components/dashboard/GreenhousesGrid';
import ControlsGrid from './components/dashboard/ControlsSection';
import { DashboardProvider } from './contexts/DashboardContext';
import LandingPage from './pages/LandingPage';

const App = () => {
  return (
    <>
      <Toaster position="top-right" richColors closeButton={true}/>
      <AuthProvider>
        <Routes>
          <Route path='/auth' element={<AuthPage />} />
          <Route path='/home' element={<LandingPage />}/>
          <Route path='/dashboard' element={
            <DashboardProvider>
              <Dashboard />
            </DashboardProvider>
          } >
            {/* <Route index element={<Navigate to="location" />} /> */}
            <Route path="location" element={<LocationsGrid />} />
            <Route path="location/greenhouse" element={<GreenhousesGrid />} />
            <Route path="location/greenhouse/sensors" element={<ControlsGrid />} />
            <Route path="*" element={<Navigate to="/dashboard/location" replace />} />
          </Route>
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
