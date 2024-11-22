// src/layout.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import injectContext from "./store/appContext";
import NavBar from "./component/Navbar";
import { Footer } from "./component/footer";
import { DashboardAdmin } from "./pages/dashboardAdmin";
import { DashboardTeacher } from "./pages/dashboardTeacher";
import RegistrationForm from './component/RegistrationForm';
import LoginForm from './component/LoginForm';
import ParentDashboard from "./pages/ParentDashboard.jsx";

const Layout = () => {
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") {
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
                        <Route element={<DashboardTeacher />} path="/dashboardTeacher" />
                        <Route element={<ParentDashboard />} path="/dashboard/parent" />
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
