import { useLocation, useNavigate } from "react-router-dom"
import { useDashboard } from "../../contexts/DashboardContext"
import { Greenhouse } from "../../types/greenhouse"
import axios, { AxiosError } from "axios"
import { formatDistanceToNow } from "date-fns"

interface GreenhouseCardProps {
    greenhouseData: Greenhouse
}

const GreenhouseCard = ({greenhouseData}: GreenhouseCardProps) => {

    const { setCurrentGreenhouse } = useDashboard()
    const navigate = useNavigate()
    const location = useLocation()
    
    const pathname = location.pathname;

    const cultureName = greenhouseData.culture?.name
        ? greenhouseData.culture.name.charAt(0).toUpperCase() + greenhouseData.culture.name.slice(1)
        : "";

    const updateGreenhouseDate = async () => {
        try {
            const res  = await axios.patch(`${import.meta.env.VITE_API_BASE_URL}greenhouses/${greenhouseData.id}`, {}, {
                withCredentials: true,
            })
            greenhouseData = res.data
        } catch (error: AxiosError | any) {
            console.error(error.response.data.message)      
        }
    }

    const selectGreenhouse = async () => {
        await updateGreenhouseDate();
        setCurrentGreenhouse(greenhouseData)
        sessionStorage.setItem("greenhouse", JSON.stringify(greenhouseData))
        navigate(pathname + "/sensors")
    }


  return (
    <div className="card location-card">
        <div className="card-header gh-card-header">
            <div className="left">
                <h3>{greenhouseData.name}</h3>
                {cultureName ?
                <div className="culture-name">{cultureName}</div> : <></>
                }
            </div>
        </div>
        <div className="card-body">
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <p>Last Visited:</p>
                <p>{greenhouseData.lastVisited != null ?
                    formatDistanceToNow(new Date(greenhouseData.lastVisited), { addSuffix: true }).replace('about ', '')
                    : "never"
                    }
                </p>
            </div>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <p>Sensors:</p>
                <p>{greenhouseData.sensorCount}</p>
            </div>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <p>Controls:</p>
                <p>{greenhouseData.deviceCount}</p>
            </div>
        </div>

        <div className="card-footer">
            <button className="main-btn" onClick={selectGreenhouse}>View dashboard</button>
        </div>
    </div>
  )
}

export default GreenhouseCard