import React, { useState } from "react";
import { Container, Box, Button, TextField } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { updateActivity} from "../api";

const UpdateActivity = ({ token }) => {
    let { routineActivityId } = useParams();
    let navigate = useNavigate();

    const [count, setCount] = useState('');
    const [duration, setDuration] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        await updateActivity(count, duration, routineActivityId, token);
        navigate("/myroutines");
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{ width: '100%' }}>
            <form id='update-activity-form' onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'}}>
                <h4>Update Count and Duration Below</h4>
                <TextField id="editedRoutineName" label="Count" variant="outlined" value={count}
                            margin="normal" required type="text" onChange={(e) => setCount(e.target.value)}/>
                <TextField id="editedRoutineGoal" label="Duration" variant="outlined" value={duration}
                            margin="normal" required type="text" onChange={(e) => setDuration(e.target.value)}/>
                <Button variant="contained" type="submit">Save Changes</Button>
            </form> 
            </Box>
        </Container>
    )
}

export default UpdateActivity;