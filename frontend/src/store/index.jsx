import { configureStore } from "@reduxjs/toolkit";
import { userReducer, setToken, setUser} from "./slices/userSlice";

const store = configureStore({
    reducer: {
        user: userReducer
    }
})

export {store, setToken, setUser}