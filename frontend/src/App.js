import React, {useContext} from "react";
//import { useState } from "react";
import TopBar from "./components/TopBar";
import Home from './pages/home/Home'
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  //Navigate,
  Routes,
  Route,
  //Link
} from 'react-router-dom';
import { Context } from "./context/Context";

function App() {
  const {user} = useContext(Context)
  return (
    <>
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/write" element={<Write />}/>
        <Route path="/posts/:postId" element={<Single />}/>
      </Routes>
      </Router>
    </>
  );
}

export default App;
