import axios from 'axios'

const API_URL = '/api/auth/'

//Register user
const register = async(userData) => {
    const response = await axios.post(API_URL + 'register', userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//Update user
const update = async(userData) => {
    const response = await axios.put(API_URL, userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}


//Login user
const login = async(userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//Logout user
const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    update,
    login,
    logout,
}

export default authService;