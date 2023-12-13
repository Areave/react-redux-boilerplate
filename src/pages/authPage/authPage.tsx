import './authPage.scss'
import React from 'react';
import {Types} from "../../utils/types";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser} from "../../utils/store/asyncThunks";

const AuthPage: React.FC<Types.AuthPage> = () => {


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const login2 = async () => {
        // const data = await fetch('./assets/stub/user.json');
        //
        // const properData: any = await data.json();
        // console.log(properData.data);
        //
        // setName(properData.data.name);
        // setIsAuthorized(true);
        navigate('/main');
    };

    const login = () => {
        // @ts-ignore
        dispatch(fetchUser());
        navigate('/main');
    };

    return <div className="page auth-page">
        <button onClick={login}>login</button>
    </div>
};
export default AuthPage;
