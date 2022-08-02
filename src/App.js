import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import {
  Layout,
  Home,
  Activities,
  Routines,
  MyRoutines,
  EditRoutine,
  AddActivity
} from './components';

const App = () => {
  const [token, setToken] = useState(window.localStorage.getItem('token'));
  const [username, setUsername] = useState(window.localStorage.getItem('username'));
  const [myRoutines, setMyRoutines] = useState([]);

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout token={token} setToken={setToken} setUsername={setUsername}/>}>
        <Route index element={<Home />} />
        <Route path='/activities' element={<Activities token={token} />} />
        <Route path='/routines' element={<Routines />} />
        {token ? <Route path='/myroutines' element={<MyRoutines myRoutines={myRoutines} setMyRoutines={setMyRoutines} token={token} username={username}/>} /> : null}
        {token ? <Route path='/myroutines/:routineId' element={<EditRoutine myRoutines={myRoutines} token={token}/>} /> : null}
        {token ? <Route path='/myroutines/:routineId/add-activity' element={<AddActivity token={token}/>} /> : null}
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
