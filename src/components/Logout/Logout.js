import React, {useEffect} from "react";
import {useNavigate } from 'react-router-dom';

const Logout =()=>{
    const navigate = useNavigate();
    useEffect(() =>{
        const authToken = localStorage.setItem('loginToken', null);
        console.log("==================authToken========");
        console.log(authToken)
        if (authToken === '' || authToken === undefined || authToken == null){
            navigate('/signin')
        }
    }, [])
    return (
        <div > </div>
    );
}

export default Logout;