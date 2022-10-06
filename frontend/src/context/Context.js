import { createContext, useEffect, useReducer } from "react"
import Reducer from "./Reducer"

const INITIAL_STATE = {
    user: null, //localStorage.getItem("user") !== undefined? JSON.parse(localStorage.getItem("user")): null,
    isFetching: false,
    isError: false,
}

export const Context = createContext(INITIAL_STATE)
export const ContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user))
    }, [state.user])
    return (
        <Context.Provider
        value={{
            user: state.user,
            isFetching: state.isFetching,
            isError: state.isError,
            dispatch,
        }}>
            {children}
        </Context.Provider>
    )
}