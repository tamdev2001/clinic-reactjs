// import Button from 'react-bootstrap/Button';

import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Button from '~/components/Button';
import config from '~/config';
import Search from '../Search';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('container')}>
                <Link to={config.routes.home}>
                    <img
                        className={cx('logo')}
                        alt="logo"
                        src="https://res.cloudinary.com/tamdev/image/upload/v1664423131/clinic/theme_clinika_logo_dark_szxwrg.png"
                    />
                </Link>
                <div className={cx('search-menu')}>
                    <Search>Search here!</Search>
                </div>
                <nav>
                    <Button to={config.routes.home}>Home</Button>
                    <Button to={config.routes.signIn}>Sign in</Button>
                    <Button to={config.routes.signUp}>Sign up</Button>
                    <Button to={config.routes.regiter} rounded black>
                        Appointment
                    </Button>
                </nav>
            </div>
        </header>
    );
}

export default Header;
