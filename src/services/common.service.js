import request from '~/utils/httpRequest';

function getPrescriptionsByCertificateId(cerId) {
    return request.get(`commons/certificates/${cerId}/prescriptions`);
}

function getPrescriptionDetailsByPrescriptionId(preId) {
    return request.get(`commons/prescriptions/${preId}/details`);
}

function getCertificatesByRegisterId(registerId) {
    return request.get(`commons/registers/${registerId}/certificates`);
}

function getSpecialties() {
    return request.get('commons/specialties');
}

export default {
    getPrescriptionsByCertificateId,
    getPrescriptionDetailsByPrescriptionId,
    getCertificatesByRegisterId,
    getSpecialties,
};
