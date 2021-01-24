import { createSlice } from "@reduxjs/toolkit";
const sort_func = {
  All: (a, b) => (a.id > b.id ? 1 : -1),
  Important: (a, b) => (a.priority <= b.priority ? 1 : -1),
  Completed: (a, b) => (a.done <= b.done ? 1 : -1),
  "In Progress": (a, b) => (a.done >= b.done ? 1 : -1),
  "Close Due Date": (a, b) =>
    new Date(a.date).setHours(0, 0, 0, 0) >
    new Date(b.date).setHours(0, 0, 0, 0)
      ? 1
      : -1,
};

const ToDoListInitialState = {
  show: "All",
  data: [],
  form: false,
  ToDoListId: 0,
};

const ToDoListSlice = createSlice({
  name: "ToDoList",
  initialState: ToDoListInitialState,
  reducers: {
    addToDoList(state, action) {
      const { title, date } = action.payload;
      state.data.push({
        title: title,
        date: date,
        done: false,
        priority: false,
        id: state.ToDoListId++,
      });
    },
    updateShow(state, action) {
      const { showvalue } = action.payload;
      state.show = showvalue;
      state.data.sort(sort_func[showvalue]);
    },
    toggle(state, action) {
      const { id, type } = action.payload;
      const listitem = state.data.find((item) => item.id === id);
      listitem[type] = !listitem[type];
    },
    toggleToDoForm(state) {
      state.form = !state.form;
    },
    deleteListItem(state, action) {
      const { id } = action.payload;
      const listitem = state.data.find((item) => item.id === id);
      const idx = state.data.indexOf(listitem);
      state.data.splice(idx, 1);
    },
    emptyList(state) {
      state.data.splice(0, state.data.length);
    },
  },
});

export const {
  addToDoList,
  updateShow,
  toggle,
  toggleToDoForm,
  deleteListItem,
  emptyList,
} = ToDoListSlice.actions;

export default ToDoListSlice.reducer;
