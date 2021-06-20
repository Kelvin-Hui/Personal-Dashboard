import React from "react";

// Importing Needed Modules
import moment from "moment";
import { Rnd as ResizeAndDrag } from "react-rnd";

// Importing Material-UI
import { IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";

// Importing Assets
import pinIcon from "../../assets/pinIcon.svg";
import pinoffIcon from "../../assets/pinoffIcon.svg";

// Importing Redux
import { useDispatch, useSelector } from "react-redux";
import { toggleOpen, update } from "../../features/AppStatusSlice";

const styles = {
    greeting: {
        textAlign: "center",
        color: "white",
        position: "absolute",
        padding: "1%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    greeting_text: {
        fontSize: "xxx-large",
        userSelect: "none",
        width: "100%",
    },
    delete_btn: {
        position: "absolute",
        top: 0,
        right: 0,
    },
    pin_btn: {
        position: "absolute",
        right: 0,
        bottom: 0,
    },
};

export default function LiveClock() {
    const [time, setTime] = React.useState(new Date());
    const [show, setShow] = React.useState(false);
    const [pin, setPin] = React.useState(true);
    const dispatch = useDispatch();
    const status = useSelector((state) => state.AppStatus.LiveClock);
    const name = useSelector((state) => state.AppStatus.Setting.name);

    React.useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);
    return (
        <ResizeAndDrag
            style={{ border: pin ? null : "0.5px solid" }}
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
                        app: "LiveClock",
                        x: data.x,
                        y: data.y,
                        type: "pos",
                    })
                )
            }
            onResizeStop={(e, dir, element, delta) =>
                dispatch(
                    update({
                        app: "LiveClock",
                        type: "dims",
                        w: delta.width,
                        h: delta.height,
                    })
                )
            }
            bounds="#screen"
        >
            <span
                style={{ ...styles.greeting, cursor: pin ? null : "move" }}
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
            >
                <b style={styles.greeting_text}>Welcome {name}!</b>
                <br />
                <b style={styles.greeting_text}>
                    {moment(time).format("HH:mm")}
                </b>
                {show && (
                    <>
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
                            style={styles.delete_btn}
                            size="small"
                            onClick={() =>
                                dispatch(toggleOpen({ app: "LiveClock" }))
                            }
                        >
                            <Close color="error" fontSize="small" />
                        </IconButton>
                    </>
                )}
            </span>
        </ResizeAndDrag>
    );
}
