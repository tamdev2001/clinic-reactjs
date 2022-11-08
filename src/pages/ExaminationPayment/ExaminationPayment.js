import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Button from '~/components/Button';
import Input from '~/components/Input';
import nurseService from '~/services/nurse.service';
import paymentService from '~/services/payment.service';
import registerService from '~/services/register.service';
import convertTimestamp from '~/utils/convertTimestamp';

function ExaminationPayment() {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [registers, setRegisters] = useState([]);
    const [stateRegister, setStateRegister] = useState(0);
    const [voucher, setVoucher] = useState('');

    useEffect(() => {
        registerService.getRegisters().then(
            (res) => setRegisters(res.data),
            (error) => setRegisters(error.response.data),
        );
    }, [stateRegister]);

    const handlePayment = (registerId) => {
        paymentService.paymentExamination(registerId, voucher).then((res) => {
            setStateRegister((prev) => prev + 1);
            setVoucher('');
        });
    };

    const updatePayment = (receiptId) => {
        paymentService.updatePaymentExamination(receiptId, voucher).then((res) => {
            setStateRegister((prev) => prev + 1);
            setVoucher('');
        });
    };

    if (!currentUser) {
        return <h1>Chưa đăng nhập</h1>;
    }

    return (
        <div>
            {registers.length && (
                <Table striped bordered hove="true">
                    <thead>
                        <tr>
                            <th>Mã đăng ký</th>
                            <th>Tên bệnh nhân</th>
                            <th>Số điện thoại</th>
                            <th>Voucher</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registers.map((r) => (
                            <tr>
                                <td>{r.id}</td>
                                <td>{r.name}</td>
                                <td>{r.phone}</td>
                                <td>
                                    <Input
                                        placeholder="Enter voucher..."
                                        value={voucher}
                                        onChange={(e) => setVoucher(e.target.value)}
                                    />
                                </td>
                                <td>
                                    {r.receiptExamination ? (
                                        <>
                                            <Button small green>
                                                Đã thanh toán
                                            </Button>
                                            <Button
                                                small
                                                primary
                                                onClick={() => updatePayment(r.receiptExamination.id)}
                                            >
                                                Sửa voucher
                                            </Button>
                                        </>
                                    ) : (
                                        <Button small primary onClick={() => handlePayment(r.id)}>
                                            Thanh toán
                                        </Button>
                                    )}
                                </td>
                                {r.receiptExamination && (
                                    <td>
                                        <h1>Tiền khám: {r.receiptExamination.priceTotal}</h1>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
}

export default ExaminationPayment;
