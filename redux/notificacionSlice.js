import { createSlice } from '@reduxjs/toolkit';

const initialState = { notifications: [] };

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification(state, action) {
      state.notifications.push(action.payload);
    },
    removeNotification(state, action) {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload.id
      );
    },
    // Asegúrate de que todos los reducers devuelvan un estado válido
    someOtherAction(state, action) {
      if (action.payload.condition) {
        return {
          ...state,
          // Modificaciones necesarias al estado
        };
      }
      return state; // Siempre devuelve un estado válido
    },
  },
});

export const { addNotification, removeNotification, someOtherAction } = notificationsSlice.actions;
export default notificationsSlice.reducer;
