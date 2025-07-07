import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: false,
    user: null,
    temp: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.user = action.payload;
        },
        pass: (state, action) => {
            state.temp = action.payload
        },
        logout: (state) => {
            state.status = false;
            state.user = null;
        }
    }
});

export const { login, pass, logout } = authSlice.actions;
export default authSlice.reducer;