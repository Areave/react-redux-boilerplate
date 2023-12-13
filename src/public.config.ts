import {envMode} from "./utils/enums";

const hostname =( process.env.NODE_ENV === envMode.PRODUCTION) ?
    '' : 'http://localhost:3000/assets/stub/';
export const userEndpoint = hostname + 'user.json';

export const toastTimeout = 4000;