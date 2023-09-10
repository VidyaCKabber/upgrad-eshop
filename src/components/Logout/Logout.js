import React, {useEffect} from "react";
import {useNavigate } from 'react-router-dom';

const Logout =()=>{
    const navigate = useNavigate();
    useEffect(() =>{
        const authToken = localStorage.setItem('loginToken', null);
        const loggedInUserRole = localStorage.setItem('loggedInUserRole', null);
        if (authToken === '' || authToken === undefined || authToken == null){
            navigate('/signin')
        }
    }, [])
    return (
        <div > </div>
    );
}

export default Logout;