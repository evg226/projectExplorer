export const SET_USER = "USER::SET_USER";

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload:user
    }
}
