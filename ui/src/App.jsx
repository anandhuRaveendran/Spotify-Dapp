/* eslint-disable no-unused-vars */
import React from 'react';
import Sidebar from './pages/Sidebar';
import SongsList from './pages/SongList';
import MusicControlPanel from './pages/MusicControlPanel';
import { BrowserProvider } from 'ethers';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Login from './pages/Login';
import HomePage from './pages/HomePage';

const App = () => {
  // const navigate = useNavigate();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Login />}/>
        <Route index element={<Login/>}/>
        <Route path="/home" element={<HomePage />} />

      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
 
  )
};

export default App;
