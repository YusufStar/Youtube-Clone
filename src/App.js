import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home"
import Login from "./pages/Login"
import Video from './pages/Video';

function App() {
  const { user } = useSelector((state) => state.auth)

  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={user ? <Home/>:<Login/>}/>
        <Route path='/Video/:id' element={user ? <Video/>:<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;