import React, { useState, useEffect } from "react";
import { Container, Box, Stack, Paper, styled, Button, Modal, Snackbar, TextField, Alert, Pagination } from "@mui/material";
import { fetchAllActivities, createActivity } from "../api";

const Activities = ({ token }) => { 

    const [activities, setActivities] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [messageOpen, setMessageOpen] = useState(false);
    const [message, setMessage] = useState('');

    const [page, setPage] = useState(1);
    const handlePageChange = (event, value) => {
        setPage(value);
    };

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
            const allActivities = await fetchAllActivities();
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
    <Container maxWidth="lg" sx={{minHeight: '100vh'}}>
        <h2 className='sub-title'>Activities</h2>
        <Box id="content-box" sx={{ width: '100%' }}>
            {token ? 
            <div>
                <Button onClick={handleOpen} sx={{padding: '10px', margin: '10px'}}>Create Activity</Button>
                    <Modal open={open} onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description">
                        <Box sx={modalStyle}>
                            <h2 className='sub-title'>Create Activity</h2>
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
            {activities.length ? 
            <Stack spacing={2} sx={{width: '70%'}}>
                {activities[page - 1].map((activity, index) => {
                    return (
                        <Item key={activity.id}>
                            <h3>Activity #{(page - 1) * 20 + index + 1}</h3>
                            <p>Name: {activity.name}</p>
                            <p>Description: {activity.description}</p>
                        </Item>
                    )
                })}
            </Stack>
            : null }
            <Pagination sx={{marginTop: '15px', marginBottom: '15px'}} 
                        count={activities.length}
                        page={page} color="primary" onChange={handlePageChange} 
            />
        </Box>
    </Container>
  )
}

export default Activities;