import {React, useContext} from "react";
//import { useState } from "react";
import TopBar from "./components/TopBar";
import Home from './pages/home/Home'
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { Context } from "./context/Context";
import {
  BrowserRouter as Router,
  //Navigate,
  Routes,
  Route,
  //Link
} from 'react-router-dom';

function App() {
  const {user} = useContext(Context)
  return (
    <>
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/register" element={user ? <Login />:<Register />}/>
        <Route path="/login" element={user ? <Login />: <Register />}/>
        <Route path="/settings" element={user? <Settings/>: <Login />}/>
        <Route path="/write" element={user ? <Write />: <Login />}/>
        <Route path="/posts/:postId" element={<Single />}/>
      </Routes>
      </Router>
    </>
  );
}

export default App;
