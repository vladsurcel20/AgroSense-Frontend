import { Leaf } from "lucide-react"
import { useDashboard } from "../../contexts/DashboardContext"
import { useNavigate, useLocation } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import axios, { AxiosError } from "axios"
import { Location } from "../../types/location"

interface LocationCardProps {
    locationData: Location
}

const LocationCard = ({locationData}: LocationCardProps) => {

    const { setCurrentLocation, currentLocation } = useDashboard()
    const navigate = useNavigate()
    const location = useLocation()
    
    const pathname = location.pathname;

    const updateLocationDate = async () => {
        try {
            const res  = await axios.put(`${import.meta.env.VITE_API_BASE_URL}locations/${locationData.id}`, {}, {
                withCredentials: true,
            })
            locationData = res.data
        } catch (error: AxiosError | any) {
            console.error(error.response.data.message)      
        }
    }

    const selectLocation = async () => {
        await updateLocationDate()
        setCurrentLocation(locationData)
        sessionStorage.setItem("location", JSON.stringify(locationData))
        sessionStorage.removeItem("greenhouse")
        navigate(pathname + "/greenhouse")
    }

  return (
    <div className="card location-card">
        <div className="card-header">
            <div className="left">
                <h3>{locationData.name}</h3>
                <h4 className="secondary-text">{locationData.address}, {locationData.city}</h4>
            </div>
            <Leaf size={"24"} color="var(--main-btn-color)"/>
        </div>
        <div className="card-body">
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <p>Greenhouses:</p>
                <p>{locationData.greenhouseCount}</p>
            </div>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <p>Last visited:</p>
                <p>{formatDistanceToNow(new Date(locationData.lastVisited), { addSuffix: true }).replace('about ', '')}</p>
            </div>
        </div>

        <div className="card-footer">
            <button className="main-btn" onClick={selectLocation}>Select location</button>
        </div>
    </div>
  )
}

export default LocationCard