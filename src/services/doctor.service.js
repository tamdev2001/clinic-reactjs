import authHeader from './auth-header';

const { default: request } = require('~/utils/httpRequest');

function getCertificatesByRegisterId(registerId) {
    return request.get(`doctors/registers/${registerId}/certificates`);
}

function deleteCertificate(certificateId) {
    return request.delete(`doctors/certificates/${certificateId}`);
}

function updateCertificate(cerId, cerData) {
    return request.put(`doctors/certificates/${cerId}`, cerData, { headers: authHeader() });
}

function createCertificate(registerId, cerData) {
    return request.post(`doctors/registers/${registerId}/certificates`, cerData, { headers: authHeader() });
}

export default { getCertificatesByRegisterId, deleteCertificate, updateCertificate, createCertificate };
