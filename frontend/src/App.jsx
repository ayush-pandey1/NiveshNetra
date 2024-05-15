import { useState } from "react";
import "./App.css";
import Home from "./Home/Home";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./Auth/Auth";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Layout from "./Watchlist/Layout";

function App() {
  return (
    <>
      <Router>
        <Routes>
        <Route
            exact
            path="/"
            element={
              <>
                <Home />
              </>
            }
          ></Route> 
          <Route
            exact
            path="/watchlist"
            element={
              <>
                <Layout/>
              </>
            }
          ></Route> 

          <Route
            exact
            path="/auth/login"
            element={
              <>
                <Login/>
              </>
            }
          ></Route>

          <Route
            exact
            path="/auth/signup"
            element={
              <>
                <Signup/>
              </>
            }
          ></Route>

          

        </Routes>
      </Router>
      
     
    </>
  );
}

export default App;
