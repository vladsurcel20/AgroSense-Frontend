import { useEffect } from 'react'
import LocationCard from './LocationCard'
import axios, { AxiosError } from 'axios'
import { useDashboard } from '../../contexts/DashboardContext'

const LocationsGrid = () => {

  const baseUrl = "http://localhost:5000/api/locations?count=true"

  const {searchedLocations, setLocations} = useDashboard()

  useEffect(() => {
    const fetchLocations = async () => {
      try{
        const res = await axios.get(baseUrl, {
          withCredentials: true,
        })
        const data = res.data
        setLocations(data)
      } catch (error: AxiosError | any) {
        console.error(error.response.data.message)      
      }
    }

    fetchLocations()
  }, [])

  return (
    <div className='location-cards-grid'>
      {searchedLocations?.map((location) => (
        <LocationCard key={location.id} locationData={location} />
      ))}
    </div> 
  )
}

export default LocationsGrid