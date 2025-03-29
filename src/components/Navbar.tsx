import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Leaf } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Navbar = () => {

  const navigate = useNavigate()

  return (
    <div className="navbar">
        <div className="logo-section">
            <div className="logo-wrapper">
              <Leaf size="28" color="white"/>
            </div>
            <h1>AgroSense</h1>
        </div>
        <ul className="nav-links">
            <li>Home</li>
            <li>Dashboard</li>
            <li>Settings</li>
            <li>About</li>
        </ul>
        <div className="nav-buttons">
            <FontAwesomeIcon icon={faCircleHalfStroke} size="lg" className="theme-icon"/>
            <button className="login-btn" onClick={() => navigate("/auth", { state: { section: "login" } })}>Login</button>
            <button className="signup-btn" onClick={() => navigate("/auth", { state: { section: "signup" } })}>Sign Up</button>
        </div>

    </div>
  )
}

export default Navbar