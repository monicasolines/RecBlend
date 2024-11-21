import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import injectContext from "./store/appContext";
import NavBar from "./component/Navbar";
import { Footer } from "./component/footer";
import { DashboardAdmin } from "./pages/dashboardAdmin";
import { DashboardTeacher } from "./pages/dashboardTeacher";
import { DashboardRepresentative } from "./pages/dashboardRepresentante";
import RegistrationForm from './component/RegistrationForm';
import LoginForm from './component/LoginForm';
import ProtectedRoute from "./component/ProtectedRoutes";
import Unauthorized from "./pages/Unauthorized";

const Layout = () => {
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") {
        return <div>Error: Backend URL no configurada</div>;
    }

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <NavBar />
                    <Routes>
                        {/* Rutas Públicas */}
                        <Route element={<Home />} path="/home" />
                        <Route element={<Home />} path="/" />
                        <Route element={<RegistrationForm />} path="/register" />
                        <Route element={<LoginForm />} path="/login" />














                        
                        <Route
                            path="/dashboardAdmin"
                            element={
                                <ProtectedRoute roles={["admin"]}>
                                    <DashboardAdmin />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/dashboardTeacher"
                            element={
                                <ProtectedRoute roles={["docente"]}>
                                    <DashboardTeacher />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/dashboardRepresentante"
                            element={
                                <ProtectedRoute roles={["representante"]}>
                                    <DashboardRepresentative />
                                </ProtectedRoute>
                            }
                        />
                        <Route element={<Unauthorized />} path="/unauthorized" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);