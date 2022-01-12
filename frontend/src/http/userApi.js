import {$host,$authHost} from "./index";
import jwt_decode from "jwt-decode";

export const signup= async (email,password) =>{
    const responce= await $host.post("api/user/signup",{email,password,role:"ADMIN"});
    localStorage.setItem("token",responce.data.token);
    return  jwt_decode(responce.data.token);
};

export const signin = async (email,password) =>{
    const responce= await $host.post("api/user/signin", {email,password});
    localStorage.setItem("token",responce.data.token);
    return jwt_decode(responce.data.token);
};

export const check= async () =>{
    const response = await $authHost.get("api/user/auth");
    localStorage.setItem('token', response.data.token);
    return jwt_decode(response.data.token);
};

