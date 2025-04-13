import { createSlice, configureStore } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState: { 
        user: null, 
        token: null,
        IsLoggedIn: false },
    reducers:{
        login(state,action){
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.IsLoggedIn = true;
        },

        logout(state){
            state.user = null;
            state.token = null;
            state.IsLoggedIn = false;
        }
    },
});

export const authActions = authSlice.actions;

export const store = configureStore({
    reducer: authSlice.reducer
});
