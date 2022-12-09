import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home"
import Login from "./pages/Login"

function App() {
  const {user, videos} = useSelector((state) => state.auth)

  console.log(user, videos)

  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={user ? <Home/>:<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;