'use strict'
import axios from 'axios'
import jwt_decode from 'jwt-decode'



export const authenticate = (token,next) => {
    if(typeof window !== "undefined") {
        localStorage.setItem('token', token)
    }
}

export const isAuthenticated = () => {
    if(typeof window == "undefined") {
        return false
    }
    if(localStorage.getItem('token')) {
        return jwt_decode(localStorage.getItem('token'))
       
    }else {
        return false;
    }
}


