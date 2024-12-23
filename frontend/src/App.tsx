import React from "react";
import "./global.scss";
import Home from "./pages/home/Home";
import Card from "./pages/card/Card";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/nav/Nav";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Settings from "./pages/settings/Settings";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { HelmetProvider } from "react-helmet-async";
const App = () => {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/card/:id" element={<Card />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </HelmetProvider>
  );
};

export default App;
