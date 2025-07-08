import AuthenticationContext from "../../components/content/Authentication"
import Header from "../../components/meta/Header"
import { Outlet } from "react-router"
import { Toaster } from "sonner"

export default function GlobalLayout({ children }) {
  return <>
    <AuthenticationContext>
      <Toaster />
      <Header />
      {children? children:<Outlet />}
    </AuthenticationContext>
  </>
}