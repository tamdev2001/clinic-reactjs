import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';

import { logout } from '~/actions/auth';
import { clearMessage } from '~/actions/message';

import Button from '~/components/Button';
import config from '~/config';
import Search from '../Search';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    const [showPatientBoard, setShowPatientBoard] = useState(false);
    const [showDoctorBoard, setShowDoctorBoard] = useState(false);
    const [showNurseBoard, setShowNurseBoard] = useState(false);

    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    let location = useLocation();

    useEffect(() => {
        if (['/sign-in', '/register'].includes(location.pathname)) {
            dispatch(clearMessage()); // clear message when changing location
        }
    }, [dispatch, location]);

    const logOut = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    useEffect(() => {
        if (currentUser) {
            setShowPatientBoard(currentUser.roles.includes('ROLE_PATIENT'));
            setShowDoctorBoard(currentUser.roles.includes('ROLE_DOCTOR'));
            setShowNurseBoard(currentUser.roles.includes('ROLE_NURSE'));
        } else {
            setShowPatientBoard(false);
            setShowDoctorBoard(false);
            setShowNurseBoard(false);
        }
    }, [currentUser]);

    return (
        <header className={cx('wrapper')}>
            <div className={cx('container')}>
                <Link to={config.routes.home} className={'home'}>
                    <img
                        className={cx('logo')}
                        alt="logo"
                        src="https://res.cloudinary.com/tamdev/image/upload/v1664423131/clinic/theme_clinika_logo_dark_szxwrg.png"
                    />
                </Link>
                <nav className={cx('board')}>
                    {showDoctorBoard && <Button to={config.routes.boardDoctor}>Doctor</Button>}
                    {showPatientBoard && <Button to={config.routes.boardPatient}>Patient</Button>}
                    {showNurseBoard && <Button to={config.routes.boardNurse}>Nurse</Button>}
                </nav>
                <nav className={cx('nav')}>
                    <Button to={config.routes.home}>Home</Button>

                    {currentUser ? (
                        <>
                            <Button to={config.routes.profile} relative="path">
                                {currentUser.username}
                                <img src={currentUser.avatar} width="20px" />
                            </Button>
                            <Button to={config.routes.signIn} onClick={logOut}>
                                Sign out
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button to={config.routes.signIn}>Sign in</Button>
                            <Button to={config.routes.signUp}>Sign up</Button>
                        </>
                    )}

                    <Button to={config.routes.regiter} rounded black>
                        Appointment
                    </Button>
                </nav>
            </div>
        </header>
    );
}

export default Header;
