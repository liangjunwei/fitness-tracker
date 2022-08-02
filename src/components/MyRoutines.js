import React, { useState, useEffect } from "react";
import { Container, Box, Button, Modal, Snackbar, TextField,
         Alert, FormControlLabel, Checkbox, Stack, styled, Paper } from "@mui/material";
import { createRoutine, fetchAllMyRoutines, deleteRoutine } from "../api";
import { Link } from "react-router-dom";

const MyRoutines = ({ routines, setRoutines, token, username }) => { 

    const [name, setName] = useState('');
    const [goal, setGoal] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [messageOpen, setMessageOpen] = useState(false);
    const [message, setMessage] = useState('');

    // create routine modal
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

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
    }));

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newRoutine = await createRoutine(name, goal, isPublic, token);

        if(newRoutine.error) {
            setMessage(`${newRoutine.message} ${newRoutine.name}`);
            setMessageOpen(true);
        }
        else {
            const allMyRoutines = await fetchAllMyRoutines(token, username);
            setRoutines(allMyRoutines);
            setName('');
            setGoal('');
            setIsPublic(false);
            setOpen(false);
        }
    }

    const handleDeleteRoutine = async (routineId) => {
        if(window.confirm('Are you sure to delete this routine?') === true) {
            await deleteRoutine(routineId, token);
            const allMyRoutines = await fetchAllMyRoutines(token, username);
            setRoutines(allMyRoutines);
        }
    }

    useEffect(() => {
        const fetchMyRoutines = async () => {
            const allMyRoutines = await fetchAllMyRoutines(token, username);
            setRoutines(allMyRoutines);
        }
        fetchMyRoutines();

        // eslint-disable-next-line
    }, []);

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

    return (
    <Container maxWidth="lg">
        <Box id="content-box" sx={{ width: '100%' }}>
            {token ? 
            <div>
                <Button onClick={handleOpen}>Create Routine</Button>
                    <Modal open={open} onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description">
                        <Box sx={modalStyle}>
                            <h2>Create Routine</h2>
                            <form onSubmit={handleSubmit}
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center'}} >
                                <TextField id="routineName" label="Name" variant="outlined" value={name}
                                           margin="normal" type="text" fullWidth required
                                           onChange={(e) => setName(e.target.value)} />
                                <TextField id="routineGoal" label="Goal" variant="outlined" value={goal}
                                           margin="normal" type="text" fullWidth required 
                                           onChange={(e) => setGoal(e.target.value)} />
                                <FormControlLabel control={<Checkbox id="routineIsPublic" onChange={(e) => setIsPublic(e.target.checked)}/>} 
                                                                     label="Is Public?" />
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
            {routines.length ? 
            <Stack spacing={2}>
                {routines.map((routine, index) => {
                    return (
                        <Item key={routine.id} sx={{ width: '800px' }}>
                            <h3>My Routine #{index + 1}</h3>
                            <p>Name: {routine.name}</p>
                            <p>Goal: {routine.goal}</p>
                            <p>Creator: {routine.creatorName}</p>
                            {routine.activities && routine.activities.length ? 
                            <div>
                            <h4>Activities:</h4>
                            {routine.activities.map((activity, index) => {
                                return <div key={index}>
                                            <p>{index + 1}: {activity.name}</p>
                                            <p>- Description: {activity.description}</p>
                                            <p>- Duration: {activity.duration} minutes</p>
                                            <p>- Count: {activity.count}</p>
                                        </div>
                            })}
                            </div>
                            : null}
                            <Link to={`/myroutines/${routine.id}`}>
                                <Button variant="outlined">Edit Route</Button>
                            </Link>
                            <Button variant="outlined" color="error" onClick={() => {handleDeleteRoutine(routine.id)}}>Delete</Button>
                        </Item>
                    )
                })}
            </Stack>
            :
            <h2>Nothing's Here Yet! Create Your Routine Now!</h2>
            }
        </Box>
    </Container>
  )
}

export default MyRoutines;