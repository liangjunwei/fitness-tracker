import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import {
  Layout,
  Home,
  Activities,
  Routines,
  MyRoutines
} from './components';

const App = () => {
  const [token, setToken] = useState(window.localStorage.getItem('token'));
  const [username, setUsername] = useState(window.localStorage.getItem('username'));

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout token={token} setToken={setToken} setUsername={setUsername}/>}>
        <Route index element={<Home />} />
        <Route path='/activities' element={<Activities token={token} />} />
        <Route path='/routines' element={<Routines token={token} />} />
        {token ? <Route path='/myroutines' element={<MyRoutines token={token} username={username}/>} /> : null}
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
