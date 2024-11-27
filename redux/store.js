import { configureStore } from "@reduxjs/toolkit";
import valorReducer from "./valorSlice";
import notificationsReducer from './notificacionSlice';

const store = configureStore({
  reducer: {
    valor: valorReducer,
    notifications: notificationsReducer,
    // Otros reducers si los tienes
  },
});

export default store;