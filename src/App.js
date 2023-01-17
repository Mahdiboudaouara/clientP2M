import "./App.css";
import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateEvent from "./components/CreateEvent";
import Navbar from "./components/Navbar";
import Event from "./components/Event";
import Footer from "./components/Footer";
import NoAccess from "./components/NoAccess";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      console.log(token);
      const user = jwtDecode(token);
      if (user.exp < Date.now() / 1000){
        localStorage.removeItem("token");
        setIsAuthenticated(false)
      }
      console.log("user:", user);

      if (!user) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setIsAuthenticated(!isAuthenticated);
      }
    }
  }, []);
  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      <Routes>
        {/* <Route path="/" element={isAuthenticated===true ? <Home /> : <NoAccess/>} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/index" element={<Event />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
