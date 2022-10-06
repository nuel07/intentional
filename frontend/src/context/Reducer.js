const Reducer = (state, action) => {
    switch(action.type){
        case "REGISTER_START":
            return {
                user: null,
                isFetching: true,
                isError: false,
            }
        case "REGISTER_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                isError: false,
            }
        case "REGISTER_FAILURE":
            return {
                user: null,
                isFetching: false,
                isError: true,
            }
        case "LOGIN_START":
            return {
                user: null,
                isFetching: true,
                isError: false,
            }
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                isError: false,
            }
        case "LOGIN_FAILURE":
            return {
                user: null,
                isFetching: false,
                isError: true,
            }
        case "LOGOUT":
            return{
                user: null,
                isFetching: false,
                isError: false
            }
        case "UPDATE_START":
            return {
                ...state,
                isFetching: true,
            }
        case "UPDATE_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                isError: false,
            }
        case "UPDATE_FAILURE":
            return {
                user: state.user,
                isFetching: false,
                isError: true,
            }
        default:
            return state;
    }   
}

export default Reducer;