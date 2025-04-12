import Navbar from '../components/Navbar'
import BreadcrumbNav from '../components/BreadcrumbNav'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import { useEffect } from 'react';

const Dashboard = () => {

 
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      navigate("/dashboard/location", { replace: true });
    }
  }, [location.pathname]);

  return (
    <>
      <Navbar />

      <div className='dashboard-page page'>
        <div className='dashboard-header'>
          <BreadcrumbNav />
        </div>

        <div className='dashboard-content'>       
          <Outlet />
        </div>

      </div>
    </>
  )
}

export default Dashboard