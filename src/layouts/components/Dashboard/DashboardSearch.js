import React from 'react';
import { FaSearch } from 'react-icons/fa';
import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';

const cx = classNames.bind(styles);

const DashboardSearch = () => {
    return (
        <div className={cx('search-container')}>
            <div className={cx('input-container')}>
                <input type="text" placeholder="Bạn cần tìm gì?" className={cx('search-input')} />
            </div>
            <button className={cx('search-button')}>
                <FaSearch></FaSearch>
            </button>
        </div>
    );
};

export default DashboardSearch;
