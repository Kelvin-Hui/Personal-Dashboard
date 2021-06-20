import { createSlice } from "@reduxjs/toolkit";

const status_position = {
    Calendar: {
        open: false,
        pos: { x: -230, y: -160 },
        dims: { height: 450, width: 450 },
    },
    Goals: {
        open: false,
        pos: { x: -200, y: -200 },
        dims: { height: 350, width: 400 },
    },
    StockTracker: {
        open: false,
        pos: { x: -200, y: -240 },
        dims: { height: 350, width: 400 },
    },
    ToDoList: {
        open: false,
        pos: { x: -200, y: -280 },
        dims: { height: 350, width: 400 },
    },
    LiveClock: {
        open: true,
        pos: { x: -200, y: 0 },
        dims: { height: 150, width: 400 },
    },
    ImportExport: {
        open: false,
    },
    Setting: {
        open: true,
        name: "",
    },
};

const AppStatusSlice = createSlice({
    name: "AppStatus",
    initialState: status_position,
    reducers: {
        toggleOpen(state, action) {
            const { app } = action.payload;
            state[app].open = !state[app].open;
        },
        update(state, action) {
            const { app, type } = action.payload;
            switch (type) {
                case "pos":
                    const { x, y } = action.payload;
                    if (x !== 0 && y !== 0) {
                        state[app].pos.x = x;
                        state[app].pos.y = y;
                    }
                    break;

                case "dims":
                    const { w, h } = action.payload;
                    if (w !== null && h !== null) {
                        state[app].dims.width += w;
                        state[app].dims.height += h;
                    }
                    break;

                default:
                    break;
            }
        },
        updateName(state, action) {
            const { name } = action.payload;
            state.Setting.name = name;
        },
    },
});

export const { toggleOpen, update, updateName } = AppStatusSlice.actions;

export default AppStatusSlice.reducer;
