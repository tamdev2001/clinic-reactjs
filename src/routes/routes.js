import config from '~/config';
import Home from '~/pages/Home';
import ListRegisters from '~/pages/ListRegisters';
import Register from '~/pages/Appointment';
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Login from '~/pages/Login';
import Profile from '~/pages/Profile';
import Signout from '~/pages/Signout';
import BoardPatient from '~/pages/BoardPatient';
import BoardDoctor from '~/pages/BoardDoctor';
import BoardNurse from '~/pages/BoardNurse';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.regiter, component: Register },
    { path: config.routes.signIn, component: Login },
    { path: config.routes.signUp, component: SignUp },
    { path: config.routes.listRegisters, component: ListRegisters },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.signOut, component: Signout },
    { path: config.routes.signOut, component: Signout },
    { path: config.routes.boardPatient, component: BoardPatient },
    { path: config.routes.boardDoctor, component: BoardDoctor },
    { path: config.routes.boardNurse, component: BoardNurse },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
