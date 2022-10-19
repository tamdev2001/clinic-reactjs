import React from 'react';
import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import DashboardSearch from './DashboardSearch';
import { css } from 'styled-components';
import { Button } from 'react-bootstrap';

const cx = classNames.bind(styles);

const DashboardTopbar = () => {
    return (
        <div className={cx('topbar-container')}>
            <div className={cx('topbar-item-left')}>
                <img
                    src="https://github.com/thanhtamnguyen2001/clinic-reactjs/blob/react-v2/public/logo.png?raw=true"
                    alt="logo-clinic"
                />
                <div className={cx('topbar-search')}>
                    <DashboardSearch></DashboardSearch>
                </div>
            </div>
            <div className={cx('topbar-item-right')}>
                <Button className={cx('button-login')}>Đăng nhập</Button>
                <img src="https://viettelhochiminh.com.vn/wp-content/uploads/2022/05/anime-chibi-1.jpg" alt="Avartar" />
            </div>
        </div>
    );
};

export default DashboardTopbar;
