import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        token: ""
    },
    reducers:{
        setUser(state,action){
            state.user = action.payload
        },
        setToken(state, action){
            state.token = action.payload
        }
    }
})

export const userReducer = userSlice.reducer
export const {setToken, setUser} = userSlice.actions