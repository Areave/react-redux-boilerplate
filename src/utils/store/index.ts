// import {createStore, combineReducers, applyMiddleware} from 'redux'
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {composeWithDevTools} from "redux-devtools-extension";
import commonReducer from './reducers/commonReducer'
import thunk from "redux-thunk";
import {applyMiddleware, createStore} from "redux";
import {envMode} from "../enums";

const mainReducer = combineReducers({
    commonReducer: commonReducer,
    // messagesReducer: messagesReducer
});

export type RootState = ReturnType<typeof mainReducer>

export default configureStore({
    reducer: mainReducer,
    middleware: [thunk],
    devTools: process.env.NODE_ENV !== envMode.PRODUCTION,
});