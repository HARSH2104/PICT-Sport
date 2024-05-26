import "./App.css";
import Navbar from "./components/Navbar";
import AboutUs from "./components/AboutUs";
import SellItem from "./components/SellItem";
import Home from "./components/Home";
import InfoOfItem from "./components/InfoOfItem";
import NoteState from "./context/notes/NoteState";
import Profile from "./components/Profile";
import Alert from "./components/Alert";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Transaction from "./components/Transaction";
import React, { useState } from "react";

// import React, { useState } from 'react'

function App() {
  // const [idOfOtem, setId] = useState(0);

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  const handleCloseAlert = () => {
    setAlert(null);
  }

  return (
    <>
      <NoteState>
        <Router>
          <Alert alert={alert} onClose={handleCloseAlert} />
          <Navbar showAlert={showAlert} />
          <Routes>
            <Route exact path="/aboutUs" element={<AboutUs />}>
              {" "}
            </Route>
            <Route exact path="/SellItem" element={<SellItem />}>
              {" "}
            </Route>
            <Route exact path="/" element={<Home />}>
              {" "}
            </Route>
            <Route exact path="/infoofitem" element={<InfoOfItem showAlert={showAlert} />}>
              {" "}
            </Route>
            <Route exact path="/profile" element={<Profile />}>
              {" "}
            </Route>
            <Route exact path="/transaction" element={<Transaction />}>
              {" "}
            </Route>
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
