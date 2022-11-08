import request from '~/utils/httpRequest';

const handlePayment = (preId, voucher) =>
    request.post(`payment/prescriptions/${preId}/receipt-prescriptions?voucherCode=${voucher}`, {
        isPayment: true,
    });

const updatePayment = (receiptId, voucher) => {
    return request.put(`payment/receipt-prescriptions/${receiptId}?voucherCode=${voucher}`, {
        isPayment: true,
    });
};

const paymentExamination = (registerId, voucher) =>
    request.post(`payment/registers/${registerId}/receipt-examinations?voucherCode=${voucher}`, {
        isPayment: true,
    });

const updatePaymentExamination = (receiptId, voucher) => {
    return request.put(`payment/receipt-examinations/${receiptId}?voucherCode=${voucher}`, {
        isPayment: true,
    });
};

export default { handlePayment, updatePayment, paymentExamination, updatePaymentExamination };
