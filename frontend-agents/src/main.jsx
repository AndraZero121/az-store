import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router"

// # Layout/Middleware React
import GlobalLayout from "./page/layout/GlobalLayout"
// # Pages
import Homepage from "./page/Homepage"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<GlobalLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/account/profile" element={<Homepage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
