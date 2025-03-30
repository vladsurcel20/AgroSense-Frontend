import { Leaf } from "lucide-react"

const LocationCard = () => {
  return (
    <div className="card location-card">
        <div className="card-header">
            <div className="left">
                <h4>Location</h4>
                <h5>Address</h5>
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
            <button className="main-btn">Select location</button>
        </div>
    </div>
  )
}

export default LocationCard