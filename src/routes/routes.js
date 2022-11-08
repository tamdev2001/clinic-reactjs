import config from '~/config';
import Home from '~/pages/Home';
import ListRegisters from '~/pages/ListRegisters';
import Register from '~/pages/Appointment';
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Profile from '~/pages/Profile';
import BoardPatient from '~/pages/BoardPatient';
import BoardDoctor from '~/pages/BoardDoctor';
import BoardNurse from '~/pages/BoardNurse';
import Examination from '~/pages/Examination';
import Certificate from '~/pages/Certificate';
import History from '~/pages/History';
import AppointmentHistory from '~/pages/AppointmentHistory';
import Booked from '~/pages/Booked';
import Prescriptions from '~/pages/Prescriptions';
import ExaminationPayment from '~/pages/ExaminationPayment';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.regiter, component: Register },
    { path: config.routes.signIn, component: SignIn },
    { path: config.routes.signUp, component: SignUp },
    { path: config.routes.listRegisters, component: ListRegisters },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.boardPatient, component: BoardPatient },
    { path: config.routes.boardDoctor, component: BoardDoctor },
    { path: config.routes.boardNurse, component: BoardNurse },
    { path: config.routes.examination, component: Examination },
    { path: config.routes.cerDetail, component: Certificate },
    { path: config.routes.history, component: History },
    { path: config.routes.appointmentHistory, component: AppointmentHistory },
    { path: config.routes.booked, component: Booked },
    { path: config.routes.prescriptionPayment, component: Prescriptions },
    { path: config.routes.examinationPayment, component: ExaminationPayment },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
