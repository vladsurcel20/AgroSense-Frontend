import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Leaf } from "lucide-react"

const Navbar = () => {
  return (
    <div className="navbar">
        <div className="logo">
            <div className="logo-wrapper">
              <Leaf size="30" color="white" enableBackground={"var(--main-btn-color)"}/>
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
            <button className="login-btn">Login</button>
            <button className="signup-btn">Sign Up</button>
        </div>

    </div>
  )
}

export default Navbar