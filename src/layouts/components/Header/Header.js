// import Button from 'react-bootstrap/Button';

import classNames from 'classnames/bind';
// import Button from '~/components/Button';
import config from '~/config';
import styles from './Header.module.scss';
import { FaArrowUp, FaArrowDown, FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import Banner from '~/components/Banner';
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

const Header = () => {
    const [isActiveMenu, setIsActiveMenu] = useState(false);
    return (
        <div id={cx('containerHeader')} className={`${isActiveMenu ? cx('activeMenu') : ''}`}>
            <div className={cx('nav')}>
                <div className={cx('menu')}>
                    <Navbar className={cx('nav-bar')} collapseOnSelect expand="lg" variant="dark">
                        <Container>
                            <Navbar.Brand>
                                <Link style={{ display: 'inline-block' }} to={config.routes.home}>
                                    <img srcSet="logo.png" alt="" style={{ width: '45px' }} />
                                </Link>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className={'me-auto ' + cx('menu-nav')}>
                                    <NavLink to={config.routes.home} onClick={() => setIsActiveMenu(!isActiveMenu)}>
                                        Trang chủ
                                    </NavLink>
                                    <NavLink to={config.routes.signUp} onClick={() => setIsActiveMenu(!isActiveMenu)}>
                                        Đăng ký khám
                                    </NavLink>
                                    <NavDropdown title="Dịch vụ">
                                        <NavDropdown.Item href="#action/3.1">1</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">2</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">3</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action/3.4">4</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                                <Form className="d-flex">
                                    <Form.Control
                                        type="search"
                                        placeholder="Bạn cần tìm gì?"
                                        className="me-2"
                                        aria-label="Search"
                                    />
                                    <Button variant="outline-success" className={cx('menu-search')}>
                                        <FaSearch />
                                    </Button>
                                </Form>
                            </Navbar.Collapse>
                        </Container>
                        <div className={cx('container-login')}>
                            <NavLink to={config.routes.signIn}>
                                <Button variant="outline-danger" onClick={() => setIsActiveMenu(!isActiveMenu)}>
                                    Đăng nhập
                                </Button>
                            </NavLink>
                            <NavLink to={config.routes.signUp}>
                                <Button variant="outline-success" onClick={() => setIsActiveMenu(!isActiveMenu)}>
                                    Đăng ký
                                </Button>
                            </NavLink>
                        </div>
                    </Navbar>
                    <div id={cx('direction')} onClick={() => setIsActiveMenu(!isActiveMenu)}>
                        <FaArrowUp className={cx('iconShowMenu')}></FaArrowUp>
                        <FaArrowDown className={cx('iconHideMenu')}></FaArrowDown>
                    </div>
                </div>
            </div>
            <Banner></Banner>
            {/* <div className={cx('banner')}>
                <div className={cx('content')}>Hello</div>
            </div> */}
        </div>
    );
};

export default Header;

// function Header() {
//     return (
//         <header className={cx('wrapper')}>
//             <div className={cx('container')}>
//                 <Link to={config.routes.home}>
//                     <img
//                         className={cx('logo')}
//                         alt="logo"
//                         src="https://res.cloudinary.com/tamdev/image/upload/v1664423131/clinic/theme_clinika_logo_dark_szxwrg.png"
//                     />
//                 </Link>
//                 <div className={cx('search-menu')}>
//                     <Search>Search here!</Search>
//                 </div>
//                 <nav>
//                     <Button to={config.routes.home}>Home</Button>
//                     <Button to={config.routes.signIn}>Sign in</Button>
//                     <Button to={config.routes.signUp}>Sign up</Button>
//                     <Button to={config.routes.regiter} rounded black>
//                         Appointment
//                     </Button>
//                 </nav>
//             </div>
//         </header>
//     );
// }

// export default Header;
