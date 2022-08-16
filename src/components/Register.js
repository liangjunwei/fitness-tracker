import { Snackbar, Alert, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAccount } from "../api";

const Register = ({ setLoginOrRegister, setToken, setUsername }) => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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
        
        if(confirmPassword !== password) {
            setMessage('Password not matched! Please try again!');
            setMessageOpen(true);
        }
        else {
            const newUser = await createAccount(username, password);
            if(newUser.error) {
                setMessage(`${newUser.message} ${newUser.name}`);
                setMessageOpen(true);
            }
            else {
                window.localStorage.setItem('token', newUser.token);
                setToken(newUser.token);
                window.localStorage.setItem('username', newUser.user.username);
                setUsername(newUser.user.username);
                setUserName('');
                setPassword('');
                setConfirmPassword('');
                navigate("/myroutines", { replace: true });
            }
        }
    }
    
    return (
        <>
            <h2 className='sub-title'>Register</h2>
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
                <TextField id="confirmPassword" label="Confirm Password" variant="outlined" value={confirmPassword}
                           margin="normal" type="password" fullWidth required 
                           onChange={(e) => setConfirmPassword(e.target.value)} />
                <Button id="submit-button" variant="contained" type="submit" size="large">Sign Up</Button>
            </form>
            <p style={{color: 'blue', textDecoration: 'underline', cursor: 'pointer'}}
               onClick={() => {setLoginOrRegister(true)}}>
                    Already had account? Login here!
            </p>
            <Snackbar open={messageOpen} autoHideDuration={3000} onClose={handleMessageClose}
                      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert severity="error" onClose={handleMessageClose} sx={{ width: '100%' }}>{message}</Alert>
            </Snackbar>
        </>
    )
}

export default Register;