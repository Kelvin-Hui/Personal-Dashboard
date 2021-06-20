import React from "react";

// Importing Material-UI
import { IconButton, Tooltip, Button } from "@material-ui/core";
import { NavigateBefore, NavigateNext } from "@material-ui/icons";

export function CustomEvent({ event }) {
    return (
        <span>
            <strong>{event.title}</strong>
        </span>
    );
}

export function CustomDayEvent({ event }) {
    return (
        <span>
            <strong>{event.title}</strong>
            <p>{event.detail}</p>
        </span>
    );
}

export function CustomEventAgenda({ event }) {
    return (
        <span>
            <em>{event.title}</em>
            <p>{event.detail}</p>
        </span>
    );
}

export function CustomToolbar({
    localizer: { messages },
    label,
    onNavigate,
    onView,
    views,
}) {
    const styles = {
        date: {
            margin: "auto",
            marginTop: "1.5%",
        },
        btn_gp: {
            margin: "auto",
            display: "inline-block",
            whiteSpace: "nowrap",
            width: "100%",
        },
        btn: {
            width: "25%",
        },
    };
    return (
        <>
            <div style={styles.date}>
                <IconButton onClick={() => onNavigate("PREV")} size="small">
                    <NavigateBefore />
                </IconButton>
                <Tooltip title="Return Today">
                    <strong onClick={() => onNavigate("TODAY")}>{label}</strong>
                </Tooltip>
                <IconButton onClick={() => onNavigate("NEXT")} size="small">
                    <NavigateNext />
                </IconButton>
            </div>
            <div style={styles.btn_gp}>
                {views.map((name) => (
                    <Button
                        style={styles.btn}
                        key={name}
                        onClick={() => onView(name)}
                        variant="outlined"
                    >
                        {messages[name]}
                    </Button>
                ))}
            </div>
        </>
    );
}

export function CustomEventWrapper(event, children) {
    return <div style={{ backgroundColor: event.bgColor }}>{children}</div>;
}
