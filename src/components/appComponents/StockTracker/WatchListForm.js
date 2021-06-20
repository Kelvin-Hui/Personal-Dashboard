import React from "react";

// Importing Components
import FormDialog from "../Util/FormDialog";

// Importing Material-UI
import { TextField, Fab, FormControl } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Send } from "@material-ui/icons";

// Importing Redux
import { useSelector, useDispatch } from "react-redux";
import {
    addWatchList,
    toggleStockForm,
} from "../../../features/StockTrackerSlice";

// Importing Needed Modules
import axios from "axios";

export default function GoalsForm() {
    const dispatch = useDispatch();
    const stockTracker = useSelector((state) => state.StockTracker);

    const symbol = React.useRef();
    const listName = React.useRef();

    const [error, setError] = React.useState(false);

    function checkSymbol(ticker) {
        const modules = "?modules=assetProfile," + new Date().valueOf();
        axios(
            `https://api.allorigins.win/get?url=https://query2.finance.yahoo.com/v10/finance/quoteSummary/${ticker}${modules}`
        )
            .then((response) => JSON.parse(response.data.contents))
            .then((res) => res.quoteSummary.error)
            .then((error) => {
                if (error !== null) {
                    setError(true);
                } else {
                    dispatch(
                        addWatchList({
                            listName: listName.current.value,
                            ticker: ticker,
                        })
                    );
                    dispatch(toggleStockForm());
                }
            });
    }

    function handleSumbit(e) {
        e.preventDefault();
        if (symbol.current.value !== "") {
            checkSymbol(symbol.current.value.toUpperCase());
        } else {
            setError(true);
        }
    }

    return (
        <FormDialog
            open={stockTracker.form}
            close={() => dispatch(toggleStockForm())}
            title="Add Symbol"
        >
            <FormControl>
                <TextField
                    inputRef={symbol}
                    error={error}
                    inputProps={{ style: { textTransform: "uppercase" } }}
                    onFocus={() => setError(false)}
                    margin="dense"
                    variant="outlined"
                    label="Symbol"
                    fullWidth
                    placeholder="Enter Here"
                    helperText={
                        error ? (
                            <>
                                Symbol Doesn't Exist
                                <br />
                                <a
                                    href="https://finance.yahoo.com/"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Check Your Symbol Here!
                                </a>
                            </>
                        ) : null
                    }
                />

                <Autocomplete
                    freeSolo
                    options={[...new Set(Object.keys(stockTracker.data))]}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            inputRef={listName}
                            label="List"
                            margin="dense"
                            fullWidth
                            placeholder="Enter Here"
                            variant="outlined"
                        />
                    )}
                ></Autocomplete>

                <Fab
                    variant="extended"
                    color="primary"
                    onClick={handleSumbit}
                    style={{ marginTop: "5%" }}
                >
                    <Send />
                    Add
                </Fab>
            </FormControl>
        </FormDialog>
    );
}
