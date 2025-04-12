import { Leaf } from "lucide-react"
import { useDashboard } from "../contexts/DashboardContext"
import { useNavigate, useLocation } from 'react-router-dom'



const LocationCard = () => {

    const { setCurrentLocation } = useDashboard()
    const navigate = useNavigate()
    const location = useLocation()
    
    const pathname = location.pathname;

    const selectLocation = () => {
        setCurrentLocation("Palma de mallorca")
        navigate(pathname + "/greenhouse")
    }

  return (
    <div className="card location-card">
        <div className="card-header">
            <div className="left">
                <h3>North Valley Farm</h3>
                <h4 className="secondary-text">123 Valley Road, Springfield</h4>
            </div>
            <Leaf size={"24"} color="var(--main-btn-color)"/>
        </div>
        <div className="card-body">
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <p>Greenhouses:</p>
                <p>3</p>
            </div>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <p>Last visited:</p>
                <p>2 days ago</p>
            </div>
        </div>

        <div className="card-footer">
            <button className="main-btn" onClick={selectLocation}>Select location</button>
        </div>
    </div>
  )
}

export default LocationCard