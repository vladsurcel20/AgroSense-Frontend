import { ChevronDown, ChevronUp, Leaf } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

const Navbar = () => {

  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [show, setShow] = useState<boolean>(false)
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [ t, i18n ] = useTranslation("translation");
  const [language, setLanguage] = useState<string>(i18n.language);

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
  }

  const languages = [
    { code: 'en', label: 'English', icon: '/icons8-united-kingdom-48.png' },
    { code: 'ro', label: 'Română', icon: '/icons8-romania-48.png' }
  ];
  const selectedLang = languages.find(l => l.code === language)!;
  const otherLang = languages.filter(l => l.code !== language)!;

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

  useEffect(() => {
    setLangDropdownOpen(false);
  }, [language])

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
              <li onClick={() => navigate("/home")}>{t("navbar.home")}</li>
              {user && <li onClick={() => navigate("/dashboard/location")}>{t("navbar.dashboard")}</li>}
              <li>{t("navbar.settings")}</li>
              <li>{t("navbar.about")}</li>
          </ul>

          <div className="nav-buttons">
            <div className="lang-dropdown-wrapper">
              <div className="lang-display-area">
                <button className="lang-btn selected">
                  <img src={selectedLang.icon} alt={selectedLang.code} />
                </button>
                {!langDropdownOpen ? (
                  <ChevronDown className="lang-chevron" size={16} onClick={e => {
                      e.stopPropagation();
                      setLangDropdownOpen(v => !v);
                  }}/>) : (
                  <ChevronUp className="lang-chevron" size={16} onClick={e => {
                      e.stopPropagation();
                      setLangDropdownOpen(v => !v);
                  }}/>)
                }
              </div>
              <div className={`lang-options ${langDropdownOpen ? 'active' : ''}`}>
                  {otherLang.map(lang => (
                    <button
                      key={lang.code}
                      className="lang-btn"
                      onClick={() => handleLanguageChange(lang.code)}
                    >
                      <img src={lang.icon} alt={lang.label} />
                    </button>
                  ))}
                </div>
            </div>
          { user ? (
            <div className="user-menu" onClick={() => setShow(!show)}>
              <div className="user-avatar">
                {getAvatarLetters(user!.firstName, user!.lastName)}
              </div>
              <div className="user-info">
                <p>{t("navbar.greeting")}</p>
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
            <>
              <button className="login-btn" onClick={() => navigate("/auth", { state: { section: "login" } })}>{t("navbar.login")}</button>
              <button className="signup-btn" onClick={() => navigate("/auth", { state: { section: "signup" } })}>{t("navbar.register")}</button>
            </>
          )}
      </div>
      </div>
    </header>
  )
}

export default Navbar