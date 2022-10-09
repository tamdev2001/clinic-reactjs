import request from '~/utils/httpRequest';
import authHeader from './auth-header';

function getListRegisters(phone, name) {
    return request.get('registers', {
        params: {
            phone,
            name,
        },
    });
}

function getRegisterById(id) {
    return request.get(`registers/${id}`).then((register) => register.data);
}

function createRegister(name, phone, healthIssues, examinationTime) {
    return request.post('registers', { name, phone, healthIssues, examinationTime }).then((register) => register.data);
}

function verifiedRegister(id) {
    return request.post(`registers/${id}/verified`).then((res) => res.data);
}

function deleteRegister(id) {
    return request.delete(`registers/${id}`).then((res) => res.data);
}

function updateRegister(id, name, phone, healthIssues, examinationTime) {
    return request
        .put(`registers/${id}`, { name, phone, healthIssues, examinationTime })
        .then((register) => register.data);
}

export default { getListRegisters, getRegisterById, createRegister, verifiedRegister, deleteRegister, updateRegister };
