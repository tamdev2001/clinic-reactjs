import request from '~/utils/httpRequest';
import authHeader from './auth-header';

function getPublicContent() {
    return request.get('test/all');
}

function getPatientBoard() {
    return request.get('test/patient', { headers: authHeader() });
}

function getDoctorBoard() {
    console.log({ headers: authHeader() });
    return request.get('test/doctor', { headers: authHeader() });
}

function getNurseBoard() {
    return request.get('test/nurse', { headers: authHeader() });
}

function getAdminBoard() {
    return request.get('test/admin', { headers: authHeader() });
}

function getRegistersByUserId(userId) {
    return request.get(`users/${userId}/registers`);
}

export default {
    getPublicContent,
    getPatientBoard,
    getDoctorBoard,
    getNurseBoard,
    getAdminBoard,
    getRegistersByUserId,
};
