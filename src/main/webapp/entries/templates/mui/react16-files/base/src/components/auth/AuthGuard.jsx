import { useEffect } from "react"

import { useAuth } from "./AuthProvider"
import { useRouter } from "next/router"

export const AuthGuard = ({ children }) => {
  const { authenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!authenticated) {
      router.push("/login")
    }
  }, [authenticated])

  if (authenticated) {
    return <>{children}</>
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null;
}