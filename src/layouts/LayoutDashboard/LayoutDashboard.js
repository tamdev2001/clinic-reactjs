import React from 'react';
import classNames from 'classnames/bind';
import styles from './LayoutDashboard.module.scss';
import DashboardTopbar from '../components/Dashboard/DashboardTopbar';
import DashboardSidebar from '../components/Dashboard/DashboardSidebar';

const cx = classNames.bind(styles);

const LayoutDashboard = ({ children }) => {
    return (
        <div className={cx('dashboard-container')}>
            <DashboardTopbar></DashboardTopbar>
            <div className={cx('dashboard-content')}>
                <DashboardSidebar></DashboardSidebar>
                <div>{children}</div>
            </div>
        </div>
    );
};

export default LayoutDashboard;
