import Header from "../../components/meta/Header"
import { Outlet } from "react-router"

export default function GlobalLayout({ children }) {
  return <>
    <Header />
    {children? children:<Outlet />}
  </>
}