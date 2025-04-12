import { useLocation, useNavigate } from "react-router-dom"
import { useDashboard } from "../contexts/DashboardContext"

const GreenhouseCard = () => {

     const { setCurrentGreenhouse } = useDashboard()
    const navigate = useNavigate()
    const location = useLocation()
    
    const pathname = location.pathname;

     const selectGreenhouse = () => {
        setCurrentGreenhouse("Rosiii")
        navigate(pathname + "/sensors")
    }


  return (
    <div className="card location-card">
        <div className="card-header">
            <div className="left">
                <h3>Greenhouse A</h3>
                <h4 className="secondary-text">Tomatoess</h4>
            </div>
        </div>
        <div className="card-body">
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <p>Size:</p>
                <p>500 mp2</p>
            </div>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <p>Sensors:</p>
                <p>7</p>
            </div>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <p>Controls:</p>
                <p>3</p>
            </div>
        </div>

        <div className="card-footer">
            <button className="main-btn" onClick={selectGreenhouse}>View dashboard</button>
        </div>
    </div>
  )
}

export default GreenhouseCard