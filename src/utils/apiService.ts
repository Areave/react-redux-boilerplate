import axios from 'axios';
import {userEndpoint} from "../public.config";

const errorHandler = (error: any) => {
    // console.log(error);
    error.message = {
        type: 'error',
        text: error.message || 'Error'
    };
    throw error;
};

const apiGetRequest = (url: string) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            return res(axios.get(url).then((data: any) => {
                    return Promise.resolve(data.data)
                }).catch(error => {
                    errorHandler(error);
                })
            )
        }, 1000);
    });
};

const apiPostRequest = (url: string, data?: any) => {
    return axios.post(url, data).then((data: any) => {
        return Promise.resolve(data.data)
    }).catch(error => {
        console.log(error);
        throw error;
    })
};

const getUserData = () => {
    const url = userEndpoint;
    return apiGetRequest(url);
};

export default {
    getUserData
};