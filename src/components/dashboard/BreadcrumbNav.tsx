import { Breadcrumbs, InputAdornment, TextField } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { Search, MapPin, House} from "lucide-react";
import { useDashboard } from "../contexts/DashboardContext";

const BreadcrumbNav = () => {
  const location = useLocation();
  const { currentLocation, currentGreenhouse } = useDashboard();

  const pathnames = location.pathname
    .split("/")
    .filter((x) => x && x !== "dashboard");

  const lastPath = pathnames[pathnames.length - 1];

  const mapping: { [key: string]: string } = {
    location: "Locations",
    greenhouse: "Greenhouses",
    sensors: "Sensors",
  };

  const description: { [key: string]: string } = {
    location: "Choose a location to view your greenhouses",
    greenhouse: "Choose a greenhouse to view sensors and controls",
    sensors: "Explore real-time sensor data and automation",
  };

  const icons: { [key: string]: JSX.Element } = {
    location: <MapPin size={28} color="var(--main-btn-color)" />,
    greenhouse: <House size={28} color="var(--main-btn-color)" />,
  };

  const formatPathName = (text: string) => {
    return mapping[text] || text.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const renderBreadcrumbs = () => {
    const items = [];

    if (pathnames.includes("location")) {
      items.push(
        <Link key="location" to="/dashboard/location">
          Locations
        </Link>
      );
    }

    if (pathnames.includes("greenhouse") && currentLocation) {
      items.push(<span key="loc-name">{currentLocation.name}</span>);
      items.push(
        <Link key="greenhouse" to="/dashboard/location/greenhouse">
          Greenhouses
        </Link>
      );
    }

    if (lastPath === "sensors" && currentGreenhouse) {
      items.push(
        <span key="gh-name">{currentGreenhouse.name}</span>
      );
    }

    return <Breadcrumbs className="breadcrumb">{items}</Breadcrumbs>;
  };

  const renderTitle = () => {
    if (lastPath === "sensors" && currentGreenhouse) {
      return currentGreenhouse.name;
    }
    if (lastPath === "greenhouse" && currentLocation) {
      return "Select Greenhouse";
    }
    if (lastPath === "location") {
      return "Select Location";
    }

    return formatPathName(lastPath);
  };

  return (
    <div className="navigation-section" style={{ width: "100%" }}>
      <div className="presentation-section">
        {icons[lastPath]}

        <div className="location-section">
          {lastPath !== "location" && renderBreadcrumbs()}

          <h2>{renderTitle()}</h2>
          <p className="secondary-text">{lastPath !== "sensors" && description[lastPath]}</p>
        </div>
      </div>

      {lastPath !== "sensors" && (
        <TextField
          id="navigation-input"
          type="text"
          placeholder="Search for sensors, controls, analytics"
          autoFocus={false}
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
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search size="16" color="black" />
                </InputAdornment>
              ),
            },
          }}
        />
      )}
    </div>
  );
};

export default BreadcrumbNav;
