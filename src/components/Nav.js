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
                <Link to='/'><h3 className='nav-tab'>Home</h3></Link>
                <Link to='/activities'><h3 className='nav-tab'>Activities</h3></Link>
                <Link to='/routines'><h3 className='nav-tab'>Routines</h3></Link>
                {token ? <Link to='/myroutines'><h3 className='nav-tab'>My Routines</h3></Link> : null}                
            </div>
            {token ? 
            <div style={{marginRight: '10px'}}><Button variant="contained" color="secondary" onClick={handleLogOutClick}>Log Out</Button></div>
            :
            <div style={{marginRight: '10px'}}>
                <Button onClick={handleOpen} variant="contained">Log In</Button>
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