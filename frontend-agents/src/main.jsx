import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import "leaflet/dist/leaflet.css"
import { BrowserRouter, Routes, Route } from "react-router"
import { toast } from "sonner"
// # Layout/Middleware React
import GlobalLayout from "./page/layout/GlobalLayout"
import AccountSidebar from "./page/layout/AccountSidebar"
// # Pages
import Homepage from "./page/Homepage"
import NotFound from "./page/+Not-Found"
import MustUseAuth from "./components/content/MustUseAuth"
import Login from "./page/Login"
import Register from "./page/Register"
import ProfileUser from "./page/Profile"

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      {/* Layout Root */}
      <Route element={<GlobalLayout />}>
        {/* Global */}
        <Route path="/" element={<Homepage />} />
        <Route element={<MustUseAuth havelogin={{ fn: () => {
          toast.success("Kamu sudah masuk, tidak perlu masuk/register kembali")
        }, redirect: "/account" }}/>}>
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />
        </Route>
        {/* Perlu Authentikasi */}
        <Route element={<MustUseAuth />}>
          {/* Bagian Akun */}
          <Route element={<AccountSidebar />}>
            <Route path="/account" element={<ProfileUser />} />
            <Route path="/account/update-profile" element={<ProfileUser />} />
            <Route path="/account/change-password" element={<ProfileUser />} />
            <Route path="/account/transaction-history" element={<ProfileUser />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
