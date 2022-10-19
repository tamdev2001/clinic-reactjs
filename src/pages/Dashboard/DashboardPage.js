import React, { Children } from 'react';
import LayoutDashboard from '~/layouts/LayoutDashboard/LayoutDashboard';

const DashboardPage = ({ children }) => {
    return <LayoutDashboard>{children}</LayoutDashboard>;
};

export default DashboardPage;
