import {createSlice} from '@reduxjs/toolkit'

let initialState = {
    loggedInUser: null,
    error: null,
    loading: false
}

let userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        signInStart: (state) => {
            state.loading = true
        },
        signInSuccess: (state, action) => {
            state.loggedInUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false
        },
        // sign out state
        signOutStart: (state) => {
            state.loading = true
        },
        signOutSuccess: (state) => {
            state.loggedInUser = null;
            state.loading = false;
            state.error = null
        },
        signOutFailure: (state, action) => {
            state.loading = false
            state.error = action.payload; 
        }
    }
})

export let { signInStart, signInSuccess, signInFailure,
            signOutStart, signOutSuccess, signOutFailure } = userSlice.actions;
export default userSlice.reducer
