const { default: request } = require('~/utils/httpRequest');

function getCertificatesByRegisterId(registerId) {
    return request.get(`doctors/registers/${registerId}/certificates`);
}

function deleteCertificate(certificateId) {
    return request.delete(`doctors/certificates/${certificateId}`);
}

function updateCertificate(certificateId, symptom, conclusion) {
    return request.put(`doctors/certificates/${certificateId}`);
}

export default { getCertificatesByRegisterId, deleteCertificate, updateCertificate };
