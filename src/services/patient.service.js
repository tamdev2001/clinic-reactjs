import request from '~/utils/httpRequest';

function getPrescriptionsByCertificateId(cerId) {
    return request.get(`doctors/certificates/${cerId}/prescriptions`);
}

function getPrescriptionDetailsByPrescriptionId(preId) {
    return request.get(`doctors/prescriptions/${preId}/details`);
}

function getCertificatesByRegisterId(registerId) {
    return request.get(`doctors/registers/${registerId}/certificates`);
}

export default {
    getPrescriptionsByCertificateId,
    getPrescriptionDetailsByPrescriptionId,
    getCertificatesByRegisterId,
};
