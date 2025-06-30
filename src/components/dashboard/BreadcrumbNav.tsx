import { Breadcrumbs, InputAdornment, TextField } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { Search, MapPin, House } from "lucide-react";
import { useDashboard } from "../../contexts/DashboardContext";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"; 

const BreadcrumbNav = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const {
    currentLocation,
    currentGreenhouse,
    locations,
    greenhouses,
    setSearchedLocations,
    setSearchedGreenhouses,
  } = useDashboard();
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    if (locations.length > 0) {
      setSearchedLocations(locations);
    }
  }, [locations]);

  useEffect(() => {
    if (greenhouses.length > 0) {
      setSearchedGreenhouses(greenhouses);
    }
  }, [greenhouses]);

  const pathnames = location.pathname
    .split("/")
    .filter((x) => x && x !== "breadcrumb");

  const lastPath = pathnames[pathnames.length - 1];

  const mapping: { [key: string]: string } = {
    location: t("breadcrumb.mapping.location"),
    greenhouse: t("breadcrumb.mapping.greenhouse"),
    sensors: t("breadcrumb.mapping.sensors"),
  };

  const description: { [key: string]: string } = {
    location: t("breadcrumb.description.location"),
    greenhouse: t("breadcrumb.description.greenhouse"),
    sensors: t("breadcrumb.description.sensors"),
  };

  const icons: { [key: string]: JSX.Element } = {
    location: <MapPin size={28} color="var(--main-btn-color)" />,
    greenhouse: <House size={28} color="var(--main-btn-color)" />,
  };

  const placeholder: { [key: string]: string } = {
    location: t("breadcrumb.placeholder.location"),
    greenhouse: t("breadcrumb.placeholder.greenhouse"),
  };

  const formatPathName = (text: string) => {
    return (
      mapping[text] ||
      text.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
    );
  };

  const renderBreadcrumbs = () => {
    const items = [];

    if (pathnames.includes("location")) {
      items.push(
        <Link key="location" to="/breadcrumb/location">
          {t("breadcrumb.mapping.location")}
        </Link>
      );
    }

    if (pathnames.includes("greenhouse") && currentLocation) {
      items.push(<span key="loc-name">{currentLocation.name}</span>);
      items.push(
        <Link key="greenhouse" to="/breadcrumb/location/greenhouse">
          {t("breadcrumb.mapping.greenhouse")}
        </Link>
      );
    }

    if (lastPath === "sensors" && currentGreenhouse) {
      items.push(<span key="gh-name">{currentGreenhouse.name}</span>);
    }

    return <Breadcrumbs className="breadcrumb">{items}</Breadcrumbs>;
  };

  const renderTitle = () => {
    if (lastPath === "sensors" && currentGreenhouse) {
      return currentGreenhouse.name;
    }
    if (lastPath === "greenhouse" && currentLocation) {
      return t("breadcrumb.title.greenhouse");
    }
    if (lastPath === "location") {
      return t("breadcrumb.title.location");
    }

    return formatPathName(lastPath);
  };

  useEffect(() => {
    if (lastPath === "location" && locations.length > 0) {
      if (searchValue.trim() === "") {
        setSearchedLocations([...locations]);
      } else {
        const filteredLocations = locations.filter((loc) =>
          loc.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        setSearchedLocations(filteredLocations);
      }
    } else if (lastPath === "greenhouse" && greenhouses.length > 0) {
      if (searchValue.trim() === "") {
        setSearchedGreenhouses([...greenhouses]);
      } else {
        const filteredGreenhouses = greenhouses.filter((gh) =>
          gh.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        setSearchedGreenhouses(filteredGreenhouses);
      }
    }
  }, [searchValue, lastPath]);

  useEffect(() => {
    setSearchValue("");
  }, [lastPath]);

  return (
    <div
      className="navigation-section"
      style={{
        width: "100%"
      }}
    >
      <div className="presentation-section"
      style={{
        marginBottom: lastPath === "sensors" ? "0px" : "20px",
      }}>
        {icons[lastPath]}

        <div className="location-section">
          {lastPath !== "location" && renderBreadcrumbs()}

          <h2>{renderTitle()}</h2>
          <p className="secondary-text">
            {lastPath !== "sensors" && description[lastPath]}
          </p>
        </div>
      </div>

      {lastPath !== "sensors" && (
        <TextField
          id="navigation-input"
          type="text"
          placeholder={placeholder[lastPath]}
          value={searchValue}
          autoFocus={false}
          variant="outlined"
          fullWidth
          className="search-bar"
          onChange={(e) => setSearchValue(e.target.value)}
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
