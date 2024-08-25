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
        }
    }
})

export let { signInStart, signInSuccess, signInFailure} = userSlice.actions;
export default userSlice.reducer
