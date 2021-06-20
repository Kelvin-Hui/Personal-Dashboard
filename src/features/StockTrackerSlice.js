import { createSlice } from "@reduxjs/toolkit";

const StockTrackerInitialState = {
    form: false,
    data: {},
};

const StockTrackerSlice = createSlice({
    name: "StockTracker",
    initialState: StockTrackerInitialState,
    reducers: {
        addWatchList(state, action) {
            const { listName, ticker } = action.payload;
            if (state.data[listName] == null) {
                state.data[listName] = [ticker];
            } else {
                if (!state.data[listName].includes(ticker)) {
                    state.data[listName].push(ticker);
                }
            }
        },
        deleteWatchList(state, action) {
            const { listName, ticker } = action.payload;
            if (state.data[listName].length === 1) {
                delete state.data[listName];
            } else {
                const target = state.data[listName].find(
                    (quote) => quote === ticker
                );
                const idx = state.data[listName].indexOf(target);
                state.data[listName].splice(idx, 1);
            }
        },
        toggleStockForm(state) {
            state.form = !state.form;
        },
    },
});

export const { addWatchList, deleteWatchList, toggleStockForm } =
    StockTrackerSlice.actions;
export default StockTrackerSlice.reducer;
