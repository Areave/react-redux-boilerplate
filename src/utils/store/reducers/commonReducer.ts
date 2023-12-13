import {Types} from '../../types'
import {createReducer} from "@reduxjs/toolkit";
import {createAddMessageAction, setIsAuthorizedAction, setIsLoadingAction, setUserAction} from "../actionCreators";

const initialUserState: Types.CommonState = {
    isAuthorized: false,
    isLoading: false,
    user: null,
    messages: []
};

const commonReducer = createReducer(initialUserState, (builder) => {
    builder.addCase(setIsAuthorizedAction, (state, action) => {
        state.isAuthorized = action.payload
    });
    builder.addCase(setIsLoadingAction, (state, action) => {
        state.isLoading = action.payload
    });
    builder.addCase(setUserAction, (state, action) => {
        state.user = action.payload
    });
    builder.addCase(createAddMessageAction, (state, action) => {
        state.messages = [...state.messages, action.payload]});
});

export default commonReducer;