import { useEffect } from 'react'
import { useDashboard } from '../../contexts/DashboardContext'
import GreenhouseCard from './GreenhouseCard'
import axios, { AxiosError } from 'axios'

const GreenhousesGrid = () => {

  const baseUrl = "http://localhost:5000/api/greenhouses?locationId="

  const {searchedGreenhouses, setGreenhouses, currentLocation} = useDashboard()

  useEffect(() => {
    const fetchGreenhouses = async () => {
      try{
        const res = await axios.get(baseUrl + currentLocation?.id, {
          withCredentials: true,
        })
        const data = res.data
        setGreenhouses(data)
      } catch (error: AxiosError | any) {
        console.error(error.response.data.message)      
      }
    }
    
    fetchGreenhouses()
  }, [])


  return (
    <div className="location-cards-grid">
        {
          searchedGreenhouses?.map((greenhouse) => (
            <GreenhouseCard key={greenhouse.id} greenhouseData={greenhouse} />
          ))
        }
    </div>
  )
}

export default GreenhousesGrid