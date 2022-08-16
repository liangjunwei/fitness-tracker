import React, { useState, useEffect } from "react";
import { Container, Box, Button, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { AddActivityToRoutine, fetchAllActivities } from "../api";

const AddActivity = ({ token }) => {
    let { routineId } = useParams();
    let navigate = useNavigate();

    const [activities, setActivities] = useState([]);
    const [count, setCount] = useState('');
    const [duration, setDuration] = useState('');
    const [activityId, setActivityId] = useState('');

    const handleChange = (event) => {
        setActivityId(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await AddActivityToRoutine(routineId, activityId, count, duration, token);
        navigate("/myroutines");
    }

    useEffect(() => {
        const fetchActivities = async () => {
            const allActivities = await fetchAllActivities();
            setActivities(allActivities);
        }
        fetchActivities();

        // eslint-disable-next-line
    }, []);

    return (
        <Container maxWidth="sm">
            <Box sx={{ width: '100%' }}>
            <form id='add-activity-form' onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'}}>
                <h2 className='sub-title'>Select Your Activity Below</h2>
                <FormControl fullWidth>
                    <InputLabel id="activity-select-label">Activity</InputLabel>
                    <Select
                        labelId="activity-select-label"
                        id="activity-select"
                        value={activityId}
                        label="Activity"
                        onChange={handleChange}
                        >
                        {activities.map((activity, index) => {
                            return (
                                <MenuItem key={index} value={activity.id}>{activity.name}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <TextField id="activityCount" label="Count" variant="outlined" value={count}
                            margin="normal" required type="text" onChange={(e) => setCount(e.target.value)}/>
                <TextField id="activityDuration" label="Duration(minutes)" variant="outlined" value={duration}
                            margin="normal" required type="text" onChange={(e) => setDuration(e.target.value)}/>
                <Button variant="contained" type="submit" sx={{marginTop: '15px'}}>Add Activity</Button>
            </form> 
            </Box>
        </Container>
    )
}

export default AddActivity;