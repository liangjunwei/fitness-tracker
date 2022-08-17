import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Divider } from "@mui/material";

const Layout = ({ token, setToken, setUsername }) => {
  // basic layout header, content, footer  
  return (
        <>
          <Header token={token} setToken={setToken} setUsername={setUsername} />
          <Outlet />
          <Divider sx={{marginTop: '10px', marginBottom: '10px'}}/>
          <Footer />
        </>
    )
}

export default Layout;