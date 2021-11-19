import {check, signin, signup} from "../http/userApi";
export const SET_USER = "USER::SET_USER";

export const setUser = (user) => {
    user.isAuth||localStorage.setItem("token","");
    return {
        type: SET_USER,
        payload:user
    }
}

export const SET_SELECTED_TYPE = "PROJECT::SET_SELECTED_TYPE";

export const setSeletedType = (type) => {
    return {
        type: SET_SELECTED_TYPE,
        payload:type
    }
}

export const SET_SELECTED_AUTHOR = "PROJECT::SET_SELECTED_AUTHOR";

export const setSeletedAuthor = (author) => {
    return {
        type: SET_SELECTED_AUTHOR,
        payload:author
    }
}

export const getAuth = (isSignin,email,password)=>async(dispatch)=>{
    let user;
    try{
        if (isSignin){
            user = await signin(email,password);
        } else {
            user = await signup(email,password);
        };
        dispatch(setUser({name:user.email,isAuth:true}));
    }catch (e) {
        console.log(e.message);
        console.log(e.response.data.message);
        dispatch(setUser({name:"",isAuth:false,error:e.response.data.message}));
    }

}

export const checkAuth = ()=>async(dispatch)=>{
    let user = {name: "", isAuth: false,loading:false};
    try{
        const response=await check();
        console.log(response);
        user= { name: response.email, isAuth: true,loading:false};
    } catch (e){
        console.log(e.message);
    }
    setTimeout(() => {
        dispatch(setUser(user));
    }, 1000);

}
