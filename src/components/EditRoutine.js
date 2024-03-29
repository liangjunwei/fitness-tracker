import React, { useState } from "react";
import { Container, Box, Button, TextField, FormControlLabel, Checkbox } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { editRoutine } from "../api";

const EditRoutine = ({ myRoutines, token }) => {
    let { routineId } = useParams();
    let navigate = useNavigate();
    const routine = myRoutines.filter((routine) => routine.id === parseInt(routineId));

    const [name, setName] = useState(routine[0].name);
    const [goal, setGoal] = useState(routine[0].goal);
    const [isPublic, setIsPublic] = useState(routine[0].isPublic);

    const handleRoutineEdit = async (event) => {
        event.preventDefault();
        await editRoutine(name, goal, isPublic, routine[0].id, token);
        navigate("/myroutines");
    }

    return (
        <Container maxWidth="sm" sx={{height: '100vh'}}>
            <Box sx={{ width: '100%' }}>
            <form id='routine-edit-form' onSubmit={handleRoutineEdit} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'}}>
                <h2 className='sub-title'>Edit Your Routine Below</h2>
                <TextField id="editedRoutineName" label="Name" variant="outlined" value={name} sx={{width: '50%'}}
                            margin="normal" required type="text" onChange={(e) => setName(e.target.value)}/>
                <TextField id="editedRoutineGoal" label="Goal" variant="outlined" value={goal} sx={{width: '50%'}}
                            margin="normal" required type="text" onChange={(e) => setGoal(e.target.value)}/>
                <FormControlLabel control={<Checkbox id="editedRoutineIsPublic" onChange={(e) => setIsPublic(e.target.checked)}/>} 
                        label="Is Public?" checked={isPublic}/>
                <Button variant="contained" type="submit" sx={{marginTop: '15px'}}>Save Changes</Button>
            </form> 
            </Box>
        </Container>
    )
}

export default EditRoutine;