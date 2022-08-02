import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import {
  Layout,
  Home,
  Activities,
  Routines,
  MyRoutines,
  EditRoutine
} from './components';

const App = () => {
  const [token, setToken] = useState(window.localStorage.getItem('token'));
  const [username, setUsername] = useState(window.localStorage.getItem('username'));
  const [routines, setRoutines] = useState([]);

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout token={token} setToken={setToken} setUsername={setUsername}/>}>
        <Route index element={<Home />} />
        <Route path='/activities' element={<Activities token={token} />} />
        <Route path='/routines' element={<Routines token={token} />} />
        {token ? <Route path='/myroutines' element={<MyRoutines routines={routines} setRoutines={setRoutines} token={token} username={username}/>} /> : null}
        {token ? <Route path='/myroutines/:routineId' element={<EditRoutine routines={routines} token={token}/>} /> : null}
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
