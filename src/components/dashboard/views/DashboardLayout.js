import React from 'react'
import DashboardHeader from './DashboardHeader';
import { Outlet } from 'react-router-dom';
import DashboardFooter from "./DashboardFooter";

function DashboardLayout() {
    return (
        <div id="content-wrapper">
            <DashboardHeader />
            <Outlet />
            <DashboardFooter />
        </div>
       
    )
}

export default DashboardLayout
