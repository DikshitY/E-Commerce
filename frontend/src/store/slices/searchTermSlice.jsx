import { createSlice } from "@reduxjs/toolkit";

const searchTermSlice = createSlice({
    name: "searchTerm",
    initialState: "",
    reducers: {
        changeSearchTerm(state, action){
            return action.payload
        }
    }
})

export const searchTermReducer = searchTermSlice.reducer;
export const {changeSearchTerm} = searchTermSlice.actions;