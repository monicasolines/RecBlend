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
import ProtectedRoute from "./component/ProtectedRoutes";
import { DashboardRepresentative } from "./pages/dashboardRepresentante";
import Unauthorized from "./pages/Unauthorized";



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
                        <Route 
                            path="/dashboardAdmin" 
                            element={
                                <ProtectedRoute roles={[1]}>
                                    <DashboardAdmin />
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path="/dashboardTeacher" 
                            element={
                                <ProtectedRoute roles={[2]}>
                                    <DashboardTeacher />
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path="/representante" 
                            element={
                                <ProtectedRoute roles={[3]}>
                                    <DashboardRepresentative />
                                </ProtectedRoute>
                            } 
                        />
                        <Route element={<RegistrationForm />} path="/register" />
                        <Route element={<LoginForm />} path="/login" />
                        <Route element={<Unauthorized />} path="/unauthorized" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
