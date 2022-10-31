import request from '~/utils/httpRequest';

const handlePayment = (preId) =>
    request.post(`payment/prescriptions/${preId}/receipt-prescriptions`, {
        isPayment: true,
    });

export default { handlePayment };
