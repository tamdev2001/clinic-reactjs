import request from '~/utils/httpRequest';

function getRegisterById(id) {
    return request.get(`registers/${id}`);
}

function createRegister(data) {
    return request.post('registers', data);
}

function verifiedRegister(id) {
    return request.post(`registers/${id}/verified`);
}

function deleteRegister(id) {
    return request.delete(`registers/${id}`).then((res) => res.data);
}

function updateRegister(id, registerData) {
    return request.put(`registers/${id}`, registerData);
}

function getRegistersByCurrentUser() {
    return request.get('users/registers');
}

function getRegisters(name, phone, verified, examinationTime, createdDate) {
    return request.get('nurses/registers/', {
        params: { name, phone, verified, examinationTime, createdDate },
    });
}

export default {
    getRegisterById,
    createRegister,
    verifiedRegister,
    deleteRegister,
    updateRegister,
    getRegistersByCurrentUser,
    getRegisters,
};
