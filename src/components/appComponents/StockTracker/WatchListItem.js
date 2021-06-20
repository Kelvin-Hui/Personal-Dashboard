import React from "react";

// Importing Needed Modules
import axios from "axios";

// Importing Material-UI
import {
    ListItem,
    ListItemText,
    Typography,
    IconButton,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";

// Importing Redux
import { useDispatch } from "react-redux";
import { deleteWatchList } from "../../../features/StockTrackerSlice";

const styles = {
    price_percent: {
        textAlign: "right",
        marginRight: "5%",
    },
    up: {
        color: "#24A84A",
    },
    down: {
        color: "red",
    },
    delete_btn: {
        position: "absolute",
        right: 0,
    },
    prepostdisplay: {
        display: "inline-flex",
    },
};

function determineTime(date) {
    const d = date.getDay();
    if (d === 0 || d === 6) {
        return "Post";
    } else {
        const h = date.getHours();
        if (h >= 16 || h < 4) {
            return "Post";
        } else if (h >= 4 && h <= 9) {
            if (h === 9 && date.getMinutes() >= 30) {
                return "regular";
            }
            return "Pre";
        } else {
            return "regular";
        }
    }
}

export default function WatchListItem({ ticker, listName }) {
    const [quoteSummary, setQuoteSummary] = React.useState({
        price: 0,
        percent: { raw: 0, fmt: "0%" },
        name: "",
        prepostprice: null,
        prepostpercent: null,
    });
    const dispatch = useDispatch();

    function quotePrice(ticker) {
        const d = new Date();
        const modules = "?modules=price," + d.valueOf();

        axios(
            `https://api.allorigins.win/get?url=https://query2.finance.yahoo.com/v10/finance/quoteSummary/${ticker}${modules}`
        )
            .then((response) => JSON.parse(response.data.contents))
            .then((res) => res.quoteSummary.result[0].price)
            .then((result) => {
                if (result.quoteType === "CRYPTOCURRENCY") {
                    setQuoteSummary({
                        price: result.regularMarketPrice.raw,
                        percent: result.regularMarketChangePercent,
                        name: result.shortName,
                    });
                } else {
                    switch (determineTime(d)) {
                        case "Pre":
                            setQuoteSummary({
                                price: result.regularMarketPrice.raw,
                                percent: result.regularMarketChangePercent,
                                name: result.shortName,
                                prepostprice: result.preMarketPrice.raw,
                                prepostpercent: result.preMarketChangePercent,
                            });
                            break;
                        case "Post":
                            setQuoteSummary({
                                price: result.regularMarketPrice.raw,
                                percent: result.regularMarketChangePercent,
                                name: result.shortName,
                                prepostprice: result.postMarketPrice.raw,
                                prepostpercent: result.postMarketChangePercent,
                            });
                            break;
                        default:
                            setQuoteSummary({
                                price: result.regularMarketPrice.raw,
                                percent: result.regularMarketChangePercent,
                                name: result.shortName,
                                prepostprice: null,
                                prepostpercent: null,
                            });
                    }
                }
            });
    }

    React.useEffect(() => {
        quotePrice(ticker);
    }, [ticker]);

    React.useEffect(() => {
        let interval = setInterval(() => quotePrice(ticker), 30000);
        return () => {
            clearInterval(interval);
        };
    }, [ticker]);

    return (
        <ListItem
            divider
            style={
                quoteSummary.prepostprice
                    ? null
                    : quoteSummary.percent.raw > 0
                    ? styles.up
                    : styles.down
            }
        >
            <ListItemText primary={quoteSummary.name} secondary={ticker} />

            {quoteSummary.prepostprice ? (
                <ListItemText
                    style={styles.price_percent}
                    primary={
                        <Typography style={styles.prepostdisplay}>
                            <em>{quoteSummary.prepostprice}</em>
                            <Typography
                                style={{
                                    color:
                                        quoteSummary.prepostpercent.raw > 0
                                            ? "#24A84A"
                                            : "red",
                                    marginLeft: "5%",
                                }}
                            >
                                {quoteSummary.prepostpercent.fmt}
                            </Typography>
                        </Typography>
                    }
                    secondary={
                        <Typography>At Close: {quoteSummary.price}</Typography>
                    }
                />
            ) : (
                <ListItemText
                    style={styles.price_percent}
                    primary={<Typography>{quoteSummary.price}</Typography>}
                    secondary={
                        <Typography>{quoteSummary.percent.fmt}</Typography>
                    }
                />
            )}

            <IconButton
                size="small"
                style={styles.delete_btn}
                onClick={() =>
                    dispatch(
                        deleteWatchList({ listName: listName, ticker: ticker })
                    )
                }
            >
                <Delete color="error" fontSize="small" />
            </IconButton>
        </ListItem>
    );
}
