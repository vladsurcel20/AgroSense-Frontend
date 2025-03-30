import { Breadcrumbs, InputAdornment, TextField } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { Leaf, Search, LocateFixed, MapPin, Slice } from "lucide-react"


const BreadcrumbNav = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    const formatPathName = (text: string) => {
        return text
            .replace(/-/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase());
    };
  
    return (
        <div className="navigation-section" style={{width: "100%"}}>
            <div className="presentation-section">
                <MapPin size="28" color="var(--main-btn-color)"/>

                <div className="location-section">
                    <Breadcrumbs aria-label="breadcrumb" className="breadcrumb">
                        {pathnames.map((value, index) => {
                        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
                        const isLast = index === pathnames.length - 1;
                        const label = formatPathName(value);

                        return isLast ? (
                            <span key={to}>{label}</span>
                        ) : (
                            <Link key={to} to={to} color="inherit">
                                {label}
                            </Link>
                        );
                        })}
                    </Breadcrumbs>

                    <h2>{formatPathName(pathnames[pathnames.length-1])}</h2>
                    <p className="secondary-text">Romania, Cluj-Napoca</p>
                </div>
            </div>

        <TextField
            id="navigation-input"
            type= "text"
            placeholder="Search for sensors, controls, analytics"
            autoFocus= {false}
            variant="outlined"
            fullWidth
            className="search-bar"
            sx={{
                marginBottom: "20px",
                "& .MuiOutlinedInput-root": {
                    height: "2.5em",
                    "& fieldset": {
                        borderColor: "var(--main-btn-color)", 
                    },
                    "&:hover fieldset": {
                        borderColor: "var(--main-btn-color)", 
                    },
                    "&.Mui-focused fieldset": {
                        borderColor: "var(--main-btn-color)", 
                    },
                },
                "& .MuiInputLabel-root": {
                        color: "var(--main-btn-color)", 
                    },
                "& .MuiInputLabel-root.Mui-focused": {
                    color: "var(--main-btn-color)", 
                },
            }}
            slotProps={{
                input:{
                  startAdornment: (
                    <InputAdornment position="start" >
                        <Search size="16" color="black"/>
                    </InputAdornment>
                  )
                }
              }}
        />
    </div>
    )
}

export default BreadcrumbNav