import {Types} from '../types'
import {createAction} from "@reduxjs/toolkit";


// common
export const setIsAuthorizedAction = createAction('SET_IS_AUTHORIZED', (isAuthorized: boolean) => {
    return {payload: isAuthorized}
});
export const setIsLoadingAction = createAction('SET_LOADING', (isLoading: boolean) => {
    return {payload: isLoading}
});
export const setUserAction = createAction('SET_USER', (user: Types.User) => {
    return {payload: user}
});
export const createAddMessageAction = createAction('ADD_MESSAGE', (message: Types.Message) => {
    return {payload: message}
});