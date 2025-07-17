import React, { createContext, useState, useContext} from "react" 

const AuthContext = createContext(undefined)

export function AuthProvide({children}){

    let[user,setUser]=useState(null)

    let[isAuthenticated,setIsAuthenticated]=useState(false)


    return(
        <div>
            <AuthContext.Provider value={{user,setUser,isAuthenticated,setIsAuthenticated}}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}

export function useAuth(){
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}