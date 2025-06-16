import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Leaf } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { useEffect, useState } from "react"

const Navbar = () => {

  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [show, setShow] = useState<boolean>(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.user-menu')) {
        setShow(false);
      }
    };
  
    if(show) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [show])

  const getAvatarLetters = (firstName: string, lastName: string) => { 
    const firstLetter = firstName.charAt(0).toUpperCase()
    const lastLetter = lastName.charAt(0).toUpperCase()
    return `${firstLetter}${lastLetter}`
  }

  return (
    <header className="navbar-header">
      <div className="navbar">
          <div className="logo-section">
              <div className="logo-wrapper">
                <Leaf size="28" color="white"/>
              </div>
              <h1>AgroSense</h1>
          </div>
          <ul className="nav-links">
              <li onClick={() => navigate("/home")}>Home</li>
              {user && <li onClick={() => navigate("/dashboard/location")}>Dashboard</li>}
              <li>Settings</li>
              <li>About</li>
          </ul>

          { user ? (
            <div className="user-menu" onClick={() => setShow(!show)}>
              {/* <img src="/assets/images/user.png" alt="user" className="user-avatar" /> */}
              <div className="user-avatar">
                {getAvatarLetters(user!.firstName, user!.lastName)}
              </div>
              <div className="user-info">
                <p>Welcome back!</p>
                <h3>{user.firstName} {user.lastName}</h3>
              </div>
              {show && (
                <div className="dropdown-menu">
                  <button className="dropdown-item">Profile</button>
                  <button className="dropdown-item" onClick={logout}>Sign out</button>
                </div>
              )}
            </div>
          ) : (
          <div className="nav-buttons">
              {/* <FontAwesomeIcon icon={faCircleHalfStroke} size="lg" className="theme-icon"/>  */}
              <button className="login-btn" onClick={() => navigate("/auth", { state: { section: "login" } })}>Login</button>
              <button className="signup-btn" onClick={() => navigate("/auth", { state: { section: "signup" } })}>Sign Up</button>
          </div>
          )}

      </div>
    </header>
  )
}

export default Navbar