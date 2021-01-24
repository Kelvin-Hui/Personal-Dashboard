import { createSlice } from "@reduxjs/toolkit";

const CalendarInitialState = {
  display: { open: false, event: "" },
  form: { open: false, start: "", end: "", allDay: "" },
  events: [],
  EventId: 0,
};

const CalendarSlice = createSlice({
  name: "Calendar",
  initialState: CalendarInitialState,
  reducers: {
    addEvent(state, action) {
      const { title, detail, categories, bgColor, start, end } = action.payload;
      state.events.push({
        title: title,
        detail: detail,
        bgColor: bgColor,
        categories: categories,
        start: start,
        end: end,
        allDay: start === end,
        id: state.EventId++,
      });
    },
    // updateEvent(state, action) {
    //   const {
    //     title,
    //     detail,
    //     bgColor,
    //     categories,
    //     allDay,
    //     start,
    //     end,
    //     id,
    //   } = action.payload;
    //   let target = state.events.find((event) => event.id === id);
    //   const newTarget = {
    //     title: title,
    //     detail: detail,
    //     bgColor: bgColor,
    //     categories: categories,
    //     start: start,
    //     end: end,
    //     allDay: allDay,
    //     id: id,
    //   };
    //   target = newTarget;
    // },
    deleteEvent(state, action) {
      const { id } = action.payload;
      const target = state.events.find((event) => event.id === id);
      const idx = state.events.indexOf(target);
      state.events.splice(idx, 1);
    },

    toggleDialog(state, action) {
      const { id } = action.payload;
      state.display.open = !state.display.open;

      if (id !== null) {
        const target = state.events.find((event) => event.id === id);

        state.display.event = {
          ...target,
          start: target.start,
          end: target.end,
          date: target.start,
        };
      }
    },
    toggleEventForm(state, action) {
      if (action.payload !== undefined) {
        const { start, end, allDay } = action.payload;
        state.form.start = start;
        state.form.end = end;
        state.form.allDay = allDay;
      }
      state.form.open = !state.form.open;
    },
  },
});

export const {
  addEvent,
  updateEvent,
  deleteEvent,
  toggleDialog,
  toggleEventForm,
} = CalendarSlice.actions;
export default CalendarSlice.reducer;
