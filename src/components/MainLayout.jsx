import Footer from "./Footer";
import Header from "./Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

export function MainLayout() {
    return (
        <>
            {/* <Nav /> */}
            <Header />
            <Sidebar />
            <Outlet />
            <Footer />
        </>
    );
}