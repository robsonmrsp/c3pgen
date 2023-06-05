import React, { useEffect, useState } from "react"
import Cookies from 'js-cookie';

const redirectKey = "sign_in_redirect"


export const AuthContext = React.createContext();

AuthContext.displayName = "AuthContext"

export function useAuth() {
  const auth = React.useContext(AuthContext)

  if (!auth) {
    throw new Error("useAuth must be used within AuthProvider")
  }

  return auth
}

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(!!Cookies.get('token'))
  const [token, setToken] = useState(Cookies.get('token'))

  const [error, setError] = useState("");


  /*
    NOTICE: this is not production ready code!
    just a quick demo of resolving the initial user
  */
  useEffect(() => {

  }, [])

  const value = {
    authenticated,
    error,
    token,
    setAuthenticated,
    setToken
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
