import {createAddMessageAction, setIsAuthorizedAction, setIsLoadingAction, setUserAction} from "./actionCreators";
import apiService from "../apiService";
import {Types} from "../types";
import {messageTypes} from "../enums";
import User = Types.User;

const checkResponseForMessage = (response: any, dispatch: any) => {
    if (response.message?.type && response.message?.text) {
        dispatch(createAddMessageAction(response.message));
    }
};

export const fetchUser = () => {
    return (dispatch: any) => {
        dispatch(setIsLoadingAction(true));
        apiService.getUserData().then((response: Types.FetchUserResponse) => {
            dispatch(setIsAuthorizedAction(true));
            dispatch(setUserAction(response.data));
            dispatch(createAddMessageAction({
                type: messageTypes.MESSAGE,
                text: 'Success login!'
            }))
        }).catch((error) => {
            checkResponseForMessage(error, dispatch);
            dispatch(setIsAuthorizedAction(false));
        }).finally(() => {
            dispatch(setIsLoadingAction(false));
        })
    }
};

export const logout = () => {
    return (dispatch: any) => {
        dispatch(setIsAuthorizedAction(false));
    }
};