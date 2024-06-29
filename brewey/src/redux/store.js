import {configureStore} from "@reduxjs/toolkit";
import {combineReducers} from "redux";
import { alertsSlice} from "./alertsSlice"; 
import { userSlice } from "./userSlice";
import { breweriesSlice } from "./breweriesSlice";

const rootReducer=combineReducers({
    alerts:alertsSlice.reducer,
    user:userSlice.reducer,
    breweries: breweriesSlice.reducer,
    
})

const store=configureStore({
    reducer:rootReducer,
})

export default store;