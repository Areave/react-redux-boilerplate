import './mainPage.scss'
import React from 'react';
import Header from "../../comps/Header/Header";
import {Types} from "../../utils/types";

const MainPage: React.FC<Types.MainPage> = ({name}) => {

    return <div className="page main-page">
        <Header name={name}/>
        <div className="content">
        </div>
    </div>
};
export default MainPage;
