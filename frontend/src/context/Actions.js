//Register Actions 
export const RegisterStart = (userCredentials) => ({
    type: "REGISTER_START"
})

export const RegisterSuccess = (user) => ({
    type: "REGISTER_SUCCESS",
    payload: user,
})

export const RegisterFail = () => ({
    type: "REGISTER_FAILURE"
})

//Login Actions
export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START"
})

export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
})

export const LoginFail = () => ({
    type: "LOGIN_FAILURE"
})

//Logout Action
export const Logout = () => ({
    type: "LOGOUT"
})

//Update user actions
export const Update_Start = (userCredentials) => ({
    type: "UPDATE_START"
})

export const Update_Success = (user) => ({
    type: "UPDATE_SUCCESS",
    payload: user,
})

export const Update_Fail = () => ({
    type: "UPDATE_FAILURE"
})