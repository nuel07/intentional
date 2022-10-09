import { createContext, useEffect, useReducer } from "react"
import Reducer from "./Reducer"

const INITIAL_STATE = {
    posts: [],
    isFetching: false,
    isError: false,
}

export const Context = createContext(INITIAL_STATE)
export const ContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
    useEffect(() => {
        localStorage.setItem("posts", JSON.stringify(state.posts))
    }, [state.posts])
    return (
        <Context.Provider
        value={{
            posts: state.posts,
            isFetching: state.isFetching,
            isError: state.isError,
            dispatch,
        }}>
            {children}
        </Context.Provider>
    )
}