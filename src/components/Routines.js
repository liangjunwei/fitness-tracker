import React, { useState, useEffect } from "react";
import { Container, Box, Stack, Paper, styled } from "@mui/material";
import { fetchAllPublicRoutines } from "../api";

const Routines = () => { 

    const [routines, setRoutines] = useState([]);
  
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
    }));

    useEffect(() => {
        const fetchRoutines = async () => {
            const allPublicRputines = await fetchAllPublicRoutines();
            setRoutines(allPublicRputines);
        }
        fetchRoutines();

        // eslint-disable-next-line
    }, []);

    return (
    <Container maxWidth="lg">
        <h2 className='sub-title'>Routines</h2>
        <Box id="content-box" sx={{ width: '100%' }}>
            <Stack spacing={2}>
                {routines.map((routine, index) => {
                    return (
                        <Item key={routine.id}>
                            <h3>Routine #{index + 1}</h3>
                            <p>Name: {routine.name}</p>
                            <p>Goal: {routine.goal}</p>
                            <p>Creator: {routine.creatorName}</p>
                            {routine.activities.length ? 
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
                        </Item>
                    )
                })}
            </Stack>
        </Box>
    </Container>
  )
}

export default Routines;