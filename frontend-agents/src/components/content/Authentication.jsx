import { useContext, createContext, useState, useEffect } from "react"
import authOperation from "./_AuthOperation"
import RequestAPIApp from "../../lib/request"
import { useNavigate } from "react-router"
import { toast } from "sonner"

const CreateAuthContext = createContext("auth")

function ParseJsonIfCanParser(jsonstr) {
  try {
    return JSON.parse(jsonstr)
  } catch(e) {
    return String(jsonstr)
  }
}

export default function AuthenticationContext({ children }) {
  const navigate = useNavigate()
  const [authisLogin, setauthisLogin] = useState(false)

  function GetAuth() {
    const getUser = localStorage.getItem(authOperation.saveuserkey)||"{}"
    return {
      user: ParseJsonIfCanParser(getUser),
      token: localStorage.getItem(authOperation.saveuserkey)||null
    }
  }
  function SetAuth({ user, token } = {}) {
    localStorage.setItem(authOperation.saveuserkey, JSON.stringify(user))
    localStorage.setItem(authOperation.savetokenkey, String(token).trim())
  }
  async function RemoveAuth({ useRedirect = false } = {}) {
    const requestauth = await RequestAPIApp("/auth/logout", {
      method: "POST",
      showErrorOnToast: true,
    })
    // Success
    if(!requestauth.isError && requestauth.data) {
      localStorage.removeItem(authOperation.saveuserkey)
      localStorage.removeItem(authOperation.savetokenkey)
      if(useRedirect) {
        navigate("/") // Back To Home
      }
    }
    if(requestauth.isClient) return;
    // Logout Failed
    toast.error("Gagal logout dari akun!",{
      description: "Masalah berasal dari server"
    })
  }

  useEffect(() => {
    const getauth = GetAuth()
    if(!!getauth.token && !!getauth.user) {
      setauthisLogin(true)
    }
  }, [])
  return <CreateAuthContext.Provider value={{
    GetAuth,
    SetAuth,
    RemoveAuth,
    authisLogin
  }}>
    {children}
  </CreateAuthContext.Provider>
}

export function useAuthorization() {
  const authuse = useContext(CreateAuthContext)
  return {
    isLogin: authuse.authisLogin,
    getToken: () => {
      return String(authuse.GetAuth().token)
    },
    getUser: () => {
      return authuse.GetAuth().user
    },
    headers: () => {
      const tokenUs = authuse.GetAuth()?.token
      const prefix = "Bearer"
      return {
        "Authorization": !!tokenUs? `${prefix} ${tokenUs}`:"",
        "accept": "application/json, text/txt"
      }
    },
    setAuth: (token, user) => {
      return authuse.SetAuth({ token: token, user: user })
    },
    RemoveAuth: () => {
      return authuse.RemoveAuth()
    }
  }
}