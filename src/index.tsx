import React from 'react';
import {render as renderApp} from 'react-dom';
import App from "./app/app";
import './style/fonts.scss';
import './style/normalize.scss';
import './style/root.scss';
import {BrowserRouter} from "react-router-dom";
// @ts-ignore
import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";
import store from "./utils/store";

//@ts-ignore
const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);


