import authHeader from './auth-header';

const { default: request } = require('~/utils/httpRequest');

//Stats
function getStatsRevenueReMonthByYear(year) {
    return request.get(`admin/stats-revenue-re-month-by-year/${year}`);
}

function getStatsRevenueRpMonthByYear(year) {
    return request.get(`admin/stats-revenue-rp-month-by-year/${year}`);
}

//User

function getUsers() {
    return request.get(`admin/users`);
}

// function getUsersByRoleId(roleId) {
//     return request.get(`users/role`, roleId);
// }

function deleteUser(id) {
    return request
        .delete(`admin/users/${id}`)
        .then(() => console.log('Delete!!'))
        .catch((err) => console.log(err));
}

//Certificate

function getCertificates(regId) {
    return request.get(`admin/certificates`);
}

function deleteCertificate(id) {
    return request
        .delete(`admin/certificates/${id}`)
        .then((res) => console.log('Delete!!', res))
        .catch((err) => console.log(err));
}

function updateCertificate(id, data) {
    return request
        .put(`admin/certificates/${id}`, data)
        .then((res) => console.log('Updated!!', res))
        .catch((err) => console.log(err));
}

//Medicine

function getMedicines(name) {
    return request.get(`admin/medicines`);
}

function createMedicine(mData) {
    return request.post(`admin/medicines`, mData);
}

function deleteMedicine(id) {
    return request
        .delete(`admin/medicines/${id}`)
        .then((res) => console.log('Delete!!', res))
        .catch((err) => console.log(err));
}

function updateMedicine(id, medData) {
    return request
        .put(`admin/medicines/${id}`, medData)
        .then((res) => console.log('Updated!!', res))
        .catch((err) => console.log(err));
}

//Unit
function getUnits() {
    return request.get(`admin/units`);
}

export default {
    getUsers,
    getMedicines,
    createMedicine,
    getUnits,
    deleteMedicine,
    updateMedicine,
    deleteUser,
    getCertificates,
    deleteCertificate,
    updateCertificate,
    getStatsRevenueReMonthByYear,
    getStatsRevenueRpMonthByYear,
};
