import { useEffect } from "react"
import { useAuthorization } from "./Authentication"
import { Outlet, useNavigate } from "react-router"

/**
 * Must Use Auth To Visit!
 * @param {{children: import("react").ReactElement, havelogin: { fn: Function, redirect: "/account" }, havelogin: { fn: Function }}} param0 
 * @returns {import("react").ReactElement}
 */
export default function MustUseAuth({ children, havelogin = {}, havnonlogin = {} }) {
  const author = useAuthorization()
  const navigate = useNavigate()
  async function AuthValidate() {
    const getTokenSave = author.getToken()
    const getLocalUser = author.getUser()
    if(!getTokenSave || !getLocalUser || typeof getLocalUser !== "object" || !getLocalUser?.name) {
      if(!!getLocalUser || !!getTokenSave) {
        author.RemoveAuth() // Remove Auth Corrupted
      }
      if(havnonlogin && typeof havnonlogin === "object") {
        if(havnonlogin.fn && typeof havnonlogin.fn === "function") {
          havnonlogin.fn() // Call Function
        }
      }
      navigate("/auth/login")
      return;
    }
    // Success Login
    if(havelogin && typeof havelogin === "object") {
      if(havelogin.fn && typeof havelogin.fn === "function") {
        havelogin.fn() // Call Function
      }
      if(havelogin.redirect && typeof havelogin.redirect === "string") {
        navigate(havelogin.redirect)
      }
    }
  }
  useEffect(() => {
    AuthValidate()
  }, [])

  return <>
    {children? children:<Outlet />}
  </>
}