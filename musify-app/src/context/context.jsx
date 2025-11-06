import { Children, createContext } from "react";

const AuthContext =  createContext();

export const AuthProvider = ({Children}) =>{
    const contextValue = {

    }


    return (
        <AuthContext.Provider value={contextValue}>
            {Children}
        </AuthContext.Provider>
    )
}
