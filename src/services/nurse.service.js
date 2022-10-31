import request from '~/utils/httpRequest';

function getRegisters(name, phone, verified, examinationTime, createdDate) {
    return request.get('nurses/registers/', {
        params: { name, phone, verified, examinationTime, createdDate },
    });
}

function verifiedRegister(registerId) {
    return request.post(`nurses/registers/${registerId}/verified`);
}

function getPrescriptions() {
    return request.get('nurses/prescriptions');
}

function getPrescriptionById(preId) {
    return request.get(`nurses/prescriptions/${preId}`);
}

export default {
    getRegisters,
    verifiedRegister,
    getPrescriptions,
    getPrescriptionById,
};
