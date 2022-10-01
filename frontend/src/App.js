import * as React from "react";
//import { useState } from "react";
import TopBar from "./components/TopBar";
import Home from './pages/Home'
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
  //Link
} from 'react-router-dom';

function App() {
  const {user} = useSelector((state) => state.auth)
  return (
    <>
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/register"
        element={user ? <Home />: <Navigate replace to={<Register />}/>}/>
        <Route path="/login" element={user ? <Login />: <Navigate replace to={<Register />}/>}/>
        <Route exact path="/write"
        element={user ? <Write />: <Navigate replace to={<Login />}/>}/>
        <Route path="/settings"
        element={user ? <Settings />: <Navigate replace to={"/login"}/>}/>
        <Route path="/post/:postId" element={<Single />}/>
      </Routes>
      </Router>
    </>
  );
}

export default App;
