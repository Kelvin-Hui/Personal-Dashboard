import React from "react";

// Importing Material-UI
import { Paper, AppBar, Toolbar, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";

// Importing Needed Modules
import { Rnd as ResizeAndDrag } from "react-rnd";

// Importing Assets
import pinIcon from "../../../assets/pinIcon.svg";
import pinoffIcon from "../../../assets/pinoffIcon.svg";

// Importing Redux
import { useSelector, useDispatch } from "react-redux";
import { update } from "../../../features/AppStatusSlice";

const styles = {
    paper: {
        position: "absolute",
        inset: 0,
        margin: "auto",
        zIndex: 19,
        overflow: "auto",
    },
    close_btn: {
        position: "absolute",
        right: "5%",
    },
    pin_btn: {
        position: "absolute",
        right: "15%",
    },
    fullscreen_btn: {
        position: "absolute",
        right: "25%",
    },
};

export default function Widget(props) {
    const dispatch = useDispatch();

    const status = useSelector((state) => state.AppStatus[props.title]);

    const [pin, setPin] = React.useState(false);

    return (
        <ResizeAndDrag
            style={{ border: pin ? null : "0.5px solid", zIndex: 19 }}
            default={{
                x: status.pos.x,
                y: status.pos.y,
                width: status.dims.width,
                height: status.dims.height,
            }}
            disableDragging={pin}
            enableResizing={!pin}
            onDragStop={(e, data) =>
                dispatch(
                    update({
                        app: props.title,
                        x: data.x,
                        y: data.y,
                        type: "pos",
                    })
                )
            }
            onResizeStop={(e, dir, element, delta) =>
                dispatch(
                    update({
                        app: props.title,
                        type: "dims",
                        w: delta.width,
                        h: delta.height,
                    })
                )
            }
            bounds="#screen"
            minHeight={200}
            minWidth={200}
        >
            <Paper style={styles.paper}>
                <AppBar
                    position="sticky"
                    color="transparent"
                    style={{
                        backgroundColor: "#64574B",
                        cursor: pin ? null : "move",
                    }}
                    id="widgetHandle"
                >
                    <Toolbar
                        onMouseEnter={(e) =>
                            !pin && (e.target.style.opacity = 0.5)
                        }
                        onMouseLeave={(e) => (e.target.style.opacity = 1)}
                        variant="dense"
                    >
                        {props.icon}
                        {props.title}

                        <IconButton
                            size="small"
                            style={styles.pin_btn}
                            onClick={() => setPin(!pin)}
                        >
                            {pin ? (
                                <img src={pinoffIcon} alt="removepin" />
                            ) : (
                                <img src={pinIcon} alt="pin" />
                            )}
                        </IconButton>

                        <IconButton
                            size="small"
                            onClick={props.onClose}
                            style={styles.close_btn}
                        >
                            <Close style={{ color: "black" }} />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                {props.children}
            </Paper>
        </ResizeAndDrag>
    );
}
