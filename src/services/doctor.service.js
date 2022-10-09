const { default: request } = require('~/utils/httpRequest');

function getCertificatesByRegisterId(registerId) {
    return request.get(`doctors/registers/${registerId}/certificates`);
}

export default { getCertificatesByRegisterId };
