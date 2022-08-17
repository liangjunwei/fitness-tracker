import React, { useState, useEffect } from "react";
import { Container, Box, Stack, Paper, styled, Pagination } from "@mui/material";
import { fetchAllPublicRoutines } from "../api";

const Routines = () => { 

    const [routines, setRoutines] = useState([]);

    const [page, setPage] = useState(1);
    const handlePageChange = (event, value) => {
        setPage(value);
    };
  
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
            {routines.length ?
            <Stack spacing={2} sx={{width: '70%'}}>
                {routines[page - 1].map((routine, index) => {
                    return (
                        <Item key={routine.id}>
                            <h3>Routine #{(page - 1) * 10 + index + 1}</h3>
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
            : null }
            <Pagination sx={{marginTop: '15px', marginBottom: '15px'}} 
                        count={routines.length}
                        page={page} color="primary" onChange={handlePageChange} 
            />
        </Box>
    </Container>
  )
}

export default Routines;