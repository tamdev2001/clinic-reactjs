import React from 'react';
import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import IconDashboard from '~/components/Icon/IconDashboard';
import { NavLink } from 'react-router-dom';
import IconProfile from '~/components/Icon/IconProfile';
import IconLogOut from '~/components/Icon/IconLogOut';
import IconDarkMode from '~/components/Icon/IconDarkMode';

const cx = classNames.bind(styles);

const sidebarLinks = [
    {
        icon: <IconDashboard></IconDashboard>,
        title: 'Dashboard',
        url: '/admin',
    },
    {
        icon: <IconProfile></IconProfile>,
        title: 'Profile',
        url: '/admin/profile',
    },
    {
        icon: <IconLogOut></IconLogOut>,
        title: 'Logout',
        url: '/ssign-in',
        onclick: () => {},
    },
    {
        icon: <IconDarkMode></IconDarkMode>,
        title: null,
        url: '#',
        onclick: () => {},
    },
];

const DashboardSidebar = () => {
    return (
        <div className={cx('sidebar-container')}>
            {sidebarLinks.map((link) => (
                <NavLink
                    to={link.url}
                    key={link.title}
                    className={({ isActive }) =>
                        isActive ? cx('sidebar-navlink') + ' ' + cx('sidebar-active') : cx('sidebar-navlink')
                    }
                >
                    <span>{link.icon}</span>
                    {link.title != null ? <span>{link.title}</span> : ''}
                </NavLink>
            ))}
        </div>
    );
};

export default DashboardSidebar;
