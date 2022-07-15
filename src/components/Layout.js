import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
// import Footer from "./Footer";

const Layout = ({ token, setToken, setUsername }) => {
  // basic layout header, content, footer  
  return (
        <>
          <Header token={token} setToken={setToken} setUsername={setUsername} />
          <Outlet />
          {/* <Footer /> */}
        </>
    )
}

export default Layout;