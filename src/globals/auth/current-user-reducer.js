/**
 * sets the current user's global data
 */
import { createSlice } from '@reduxjs/toolkit';

export const currentUserSlice = createSlice({
    name: 'current_user',
    initialState: {
        value: null
    },
    reducers: {
        set: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { set } = currentUserSlice.actions;

export default currentUserSlice.reducer;