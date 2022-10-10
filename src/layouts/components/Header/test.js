<div className={cx('container')}>
    <Link to={config.routes.home} className={'home'}>
        <img
            className={cx('logo')}
            alt="logo"
            src="https://res.cloudinary.com/tamdev/image/upload/v1664423131/clinic/theme_clinika_logo_dark_szxwrg.png"
        />
    </Link>
    <nav className={cx('board')}>
        {showDoctorBoard && (
            <>
                <Button to={config.routes.boardDoctor}>Doctor</Button>
                <Button to={config.routes.listRegisters}>Danh sách khám</Button>
            </>
        )}
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
</div>;
