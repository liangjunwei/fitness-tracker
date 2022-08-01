import React, { useState, useEffect } from "react";
import { Container, Box, Stack, Paper, styled, Button, Modal, Snackbar, TextField, Alert } from "@mui/material";
import { fetchAllActivities, createActivity } from "../api";

const Activities = ({ token }) => { 

    const [activities, setActivities] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [messageOpen, setMessageOpen] = useState(false);
    const [message, setMessage] = useState('');

    // create activity modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    }

    const handleMessageClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setMessageOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const newActivity = await createActivity(name, description, token);
        
        if(newActivity.error) {
            setMessage(`${newActivity.message} ${newActivity.name}`);
            setMessageOpen(true);
        }
        else {
            const allActivities = [...activities];
            allActivities.push(newActivity);
            setActivities(allActivities);
            
            setName('');
            setDescription('');
            setOpen(false);
        }
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
  
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
    }));

    useEffect(() => {
        const fetchActivities = async () => {
            const allActivities = await fetchAllActivities();
            setActivities(allActivities);
        }
        fetchActivities();

        // eslint-disable-next-line
    }, []);

    

    return (
    <Container maxWidth="lg">
        <Box id="content-box" sx={{ width: '100%' }}>
            {token ? 
            <div>
                <Button onClick={handleOpen}>Create Activity</Button>
                    <Modal open={open} onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description">
                        <Box sx={modalStyle}>
                            <h2>Create Activity</h2>
                            <form onSubmit={handleSubmit}
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center'}} >
                                <TextField id="name" label="Name" variant="outlined" value={name}
                                           margin="normal" type="text" fullWidth required
                                           onChange={(e) => setName(e.target.value)} />
                                <TextField id="description" label="Description" variant="outlined" value={description}
                                           margin="normal" type="text" fullWidth required 
                                           onChange={(e) => setDescription(e.target.value)} />
                                <Button id="submit-button" variant="contained" type="submit" size="large">Create</Button>
                            </form>
                            <Snackbar open={messageOpen} autoHideDuration={3000} onClose={handleMessageClose}
                                      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                                <Alert severity="error" onClose={handleMessageClose} sx={{ width: '100%' }}>{message}</Alert>
                            </Snackbar>
                        </Box>
                    </Modal>
            </div>
            :
            null
            }
            <Stack spacing={2}>
                {activities.map((activity, index) => {
                    return (
                        <Item key={activity.id}>
                            <h3>Activity #{index + 1}</h3>
                            <p>Name: {activity.name}</p>
                            <p>Description: {activity.description}</p>
                        </Item>
                    )
                })}
            </Stack>
        </Box>
    </Container>
  )
}

export default Activities;