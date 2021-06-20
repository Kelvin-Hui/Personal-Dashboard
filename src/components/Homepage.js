import React from "react";

// Importing Components
import AppDialog from "./AppDialog";
import RunningApps from "./RunningApps";

// Importing Assets
import NYC_Morning from "../assets/NYC_Morning.jpg";
import NYC_Night from "../assets/NYC_Night.jpg";

// Importing Material-UI
import { Typography } from "@material-ui/core";
import { LocationOn } from "@material-ui/icons";

const styles = {
    backgroundPic: {
        height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "50% 32.5%",
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        position: "relative",
    },
    location: {
        position: "absolute",
        left: 0,
        top: 0,
        color: "white",
        userSelect: "none",
    },
    app_btn: {
        position: "absolute",
        right: 0,
        top: 0,
    },
};

function determinMorning(date) {
    const h = date.getHours();
    if (h >= 18 || h <= 6) {
        return false;
    } else {
        return true;
    }
}

export default function Homepage() {
    return (
        <div
            style={{
                ...styles.backgroundPic,
                backgroundImage: determinMorning(new Date())
                    ? `url(${NYC_Morning})`
                    : `url(${NYC_Night})`,
            }}
            id="screen"
        >
            <Typography style={styles.location}>
                <LocationOn color="error" fontSize="small" />
                New York City
            </Typography>
            <AppDialog />

            <RunningApps />
        </div>
    );
}
