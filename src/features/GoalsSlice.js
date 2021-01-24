import { createSlice } from "@reduxjs/toolkit";

const GoalsInitialState = {
  form: false,
  data: [],
  GoalsId: 0,
};

const GoalsSlice = createSlice({
  name: "ToDoList",
  initialState: GoalsInitialState,
  reducers: {
    addGoals(state, action) {
      const { goal, date } = action.payload;
      state.data.push({
        goal: goal,
        date: date,
        achieved: false,
        id: state.GoalsId++,
      });
    },
    toggleAchieved(state, action) {
      const { id } = action.payload;
      const target = state.data.find((goals) => goals.id === id);
      target.achieved = !target.achieved;
    },
    toggleGoalsForm(state) {
      state.form = !state.form;
    },
    deleteGoal(state, action) {
      const { id } = action.payload;
      const target = state.data.find((goals) => goals.id === id);
      const idx = state.data.indexOf(target);
      state.data.splice(idx, 1);
    },
    emptyGoal(state) {
      state.data.splice(0, state.data.length);
    },
  },
});

export const {
  addGoals,
  toggleAchieved,
  toggleGoalsForm,
  deleteGoal,
  emptyGoal,
} = GoalsSlice.actions;

export default GoalsSlice.reducer;
