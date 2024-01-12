import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        token: ""
    },
    reducers:{
        setToken(state, action){
            state.user = action.payload.user
            state.token = action.payload.token
        }
    }
})

export const userReducer = userSlice.reducer
export const {setToken} = userSlice.actions