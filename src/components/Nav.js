import { Box, Modal, Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

const Nav = ({ token, setToken, setUsername }) => {
    let navigate = useNavigate();
    // login/register modal
    const [open, setOpen] = useState(false);
    const [loginOrRegister, setLoginOrRegister] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setLoginOrRegister(true);
    }

    // log out button clicked, clear local storage, set token to null
    const handleLogOutClick = () => {
        window.localStorage.clear();
        setToken(null);
        setUsername(null);
        // back to home page
        navigate("/", { replace: true });
        //close modal
        setOpen(false);
        setLoginOrRegister(true);
    }

    const modalStyle = {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 450,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    // display different links based on token
    return (
        <Box id='nav-bar' sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <div>
                {/* <Tab label="Home" onClick={handleHomeClick}/> */}
                <Link to='/'>Home</Link>
                <Link to='/activities'>Activities</Link>
                <Link to='/routines'>Routines</Link>
                {token ? <Link to='/myroutines'>My Routines</Link> : null}                
            </div>
            {token ? 
            <div><Button variant="contained" onClick={handleLogOutClick}>Log Out</Button></div>
            :
            <div>
                <Button onClick={handleOpen}>Login/Register</Button>
                <Modal open={open} onClose={handleClose}
                       aria-labelledby="modal-modal-title"
                       aria-describedby="modal-modal-description">
                    <Box sx={modalStyle}>
                        {loginOrRegister ? <Login setLoginOrRegister={setLoginOrRegister} setToken={setToken} setUsername={setUsername}/> : 
                                           <Register setLoginOrRegister={setLoginOrRegister} setToken={setToken} setUsername={setUsername}/>
                        }
                    </Box>
                </Modal>
            </div>
            }
        </Box>
    )
}

export default Nav;