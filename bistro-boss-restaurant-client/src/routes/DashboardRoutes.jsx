import React from 'react';
import Sidebar from '../components/dashboard/sidebar/Sidebar';
import { MdMenuOpen } from "react-icons/md";
import Container from '../components/Container';
import { Outlet } from 'react-router-dom';


const DashboardRoutes = () => {
    return (
        <div className="drawer sm:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content ">
                <div className="p-4">
                    <label htmlFor="my-drawer-2" className="btn btn-sm btn-ghost drawer-button sm:hidden "><MdMenuOpen size={20} /></label>
                </div>
                {/* Page content here */}
                <>
                    <Outlet />
                </>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <Sidebar />
            </div>
        </div>
    );
};

export default DashboardRoutes;