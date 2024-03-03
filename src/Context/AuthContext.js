import { createContext, useEffect, useState } from "react"


  export const AuthContext = createContext();

  export function AuthContextProvider( { children} ){



  const [token, setToken] = useState(null)
  useEffect(function(){
    const val = localStorage.getItem('tkn')
    if( val !== null ){
      setToken( val )
    }

  } , [])

  return <AuthContext.Provider  value={ {myToken: token , setToken} } >
    {children}
  </AuthContext.Provider>

}