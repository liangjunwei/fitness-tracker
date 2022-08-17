import { Snackbar, Alert, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../api";

const Login = ({ setLoginOrRegister, setToken, setUsername }) => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [messageOpen, setMessageOpen] = useState(false);
    const [message, setMessage] = useState('');
    let navigate = useNavigate();

    const handleMessageClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setMessageOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const user = await userLogin(username, password);
        if(user.error) {
            setMessage(`${user.message} ${user.name}`);
            setMessageOpen(true);
        }
        else {
            window.localStorage.setItem('token', user.token);
            setToken(user.token);
            window.localStorage.setItem('username', user.user.username);
            setUsername(user.user.username);
            setUserName('');
            setPassword('');
            navigate("/myroutines", { replace: true });
        }
    }
    
    return (
        <>
            <h2 className='sub-title'>Login</h2>
            <form onSubmit={handleSubmit}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'}} >
                <TextField id="username" label="Username" variant="outlined" value={username}
                           margin="normal" type="text" fullWidth required
                           onChange={(e) => setUserName(e.target.value)} />
                <TextField id="password" label="Password" variant="outlined" value={password}
                           margin="normal" type="password" fullWidth required 
                           onChange={(e) => setPassword(e.target.value)} />
                <Button id="submit-button" variant="contained" type="submit" size="large">Login</Button>
            </form>
            <p style={{color: 'blue', textDecoration: 'underline', cursor: 'pointer'}}
               onClick={() => {setLoginOrRegister(false)}}>
                    Don't have account? Register Now!
            </p>
            <Snackbar open={messageOpen} autoHideDuration={3000} onClose={handleMessageClose}
                      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert severity="error" onClose={handleMessageClose} sx={{ width: '100%' }}>{message}</Alert>
            </Snackbar>
        </>
    )
}

export default Login;