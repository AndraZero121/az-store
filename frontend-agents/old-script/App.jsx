// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter, Routes, Route } from "react-router";
// import App from "./app";

// const root = document.getElementById("root");

// ReactDOM.createRoot(root).render(
//   <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<App />} />
//     </Routes>
//   </BrowserRouter>
// );


// import React from "react"
// import { createBrowserRouter, BrowserRouter, Link } from "react-router-dom"
// import GlobalLayout from "./page/layout/GlobalLayout"
// import Homepage from "./page/Homepage"

// const routesConfig = [
//   {
//     element: <GlobalLayout />,
//     children: [
//       { path: "/", element: <Homepage /> },
//     ],
//   },
// ]

// function AppContent() {
//   const element = createBrowserRouter(routesConfig)
//   return <>{element}</>
// }

// export default function App() {
  
//   return <BrowserRouter>
//     <AppContent />
//   </BrowserRouter>
// }