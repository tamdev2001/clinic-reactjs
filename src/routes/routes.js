import config from '~/config';
import Home from '~/pages/Home';
import ListRegisters from '~/pages/ListRegisters';
import Register from '~/pages/Appointment';
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.regiter, component: Register },
    { path: config.routes.signIn, component: SignIn },
    { path: config.routes.signUp, component: SignUp },
    { path: config.routes.listRegisters, component: ListRegisters },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
