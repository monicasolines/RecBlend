// src/layout.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import injectContext from "./store/appContext";
import NavBar from "./component/Navbar";
import { Footer } from "./component/footer";
import { DashboardAdmin } from "./pages/dashboardAdmin";
import RegistrationForm from './component/RegistrationForm';
import LoginForm from './component/LoginForm';

const Layout = () => {
    const basename = process.env.BASENAME || "";

    if (!process.env.REACT_APP_Backend_URL || process.env.REACT_APP_Backend_URL === "") {
        return <BackendURL />;
    }


    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <NavBar />
                    <Routes>
                        <Route element={<Home />} path="/home" />
                        <Route element={<Home />} path="/" />
                        <Route element={<DashboardAdmin />} path="/dashboardAdmin" />
                        <Route element={<RegistrationForm />} path="/register" />
                        <Route element={<LoginForm />} path="/login" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
