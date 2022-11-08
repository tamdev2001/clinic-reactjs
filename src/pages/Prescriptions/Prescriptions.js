import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import Button from '~/components/Button';
import MyTable from '~/components/MyTable';
import commonService from '~/services/common.service';
import nurseService from '~/services/nurse.service';
import paymentService from '~/services/payment.service';
import convertTimestamp from '~/utils/convertTimestamp';
import styles from './Prescriptions.module.scss';
import { Offcanvas } from 'react-bootstrap';
import Input from '~/components/Input';

const cx = classNames.bind(styles);

function Prescriptions() {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [prescriptions, setPrescriptions] = useState([]);
    const [statePre, setStatePre] = useState(0);
    const [medicineOfPres, setMedicineOfPres] = useState([]);
    const [payment, setPayment] = useState('');
    const [voucher, setVoucher] = useState('');

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        nurseService.getPrescriptions().then(
            (res) => setPrescriptions(res.data),
            () => setPrescriptions([]),
        );
    }, [payment]);

    useEffect(() => {
        setMedicineOfPres([]);
        prescriptions.forEach((p) =>
            commonService.getPrescriptionDetailsByPrescriptionId(p.id).then(
                (medicines) => setMedicineOfPres((prev) => [...prev, { preId: p.id, mds: medicines.data }]),
                () => setMedicineOfPres((prev) => [...prev, { preId: p.id, mds: null }]),
            ),
        );
    }, [prescriptions]);

    const handlePayment = (preId) => {
        paymentService.handlePayment(preId, voucher).then((res) => {
            setPayment(res.data);
            setVoucher('');
        });
    };

    const updatePayment = (receiptId) => {
        paymentService.updatePayment(receiptId, voucher).then((res) => {
            setPayment(res.data);
            setVoucher('');
        });
    };

    if (currentUser.roles.find((r) => r === 'ROLE_NURSE') === undefined) {
        return <h1>Please login with nurse role</h1>;
    }
    console.log('prescriptions ', prescriptions);
    return (
        <>
            {prescriptions.length && (
                <>
                    <MyTable headings={['Mã toa thuốc', 'N  gày tạo', '']} title="Toa thuốc">
                        {prescriptions.map((p) => (
                            <>
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td>{convertTimestamp(p.createdDate)}</td>
                                </tr>
                                {medicineOfPres.find((m) => m.preId === p.id) !== undefined && (
                                    <>
                                        <div className="policy-container">
                                            <div className="policy-table flex">
                                                <div>
                                                    <div className="headings-table">
                                                        <span className="heading-table">Mã thuốc</span>
                                                        <span className="heading-table">Tên thuốc</span>
                                                        <span className="heading-table">Ghi chú</span>
                                                        <span className="heading-table">Đơn vị</span>
                                                        <span className="heading-table">Số lượng/đơn vị</span>
                                                        <span classNamse="heading-table">Số lượng</span>
                                                        <span classNamse="heading-table">Giá</span>
                                                    </div>

                                                    {medicineOfPres.find((m) => m.preId === p.id).mds !== null &&
                                                        medicineOfPres
                                                            .find((m) => m.preId === p.id)
                                                            .mds.map((m) => (
                                                                <div key={m.medicine.id} className="policy">
                                                                    <span>{m.medicine.id}</span>
                                                                    <span>{m.medicine.name}</span>
                                                                    <span>{m.medicine.note}</span>
                                                                    <span>{m.medicine.unit.name}</span>
                                                                    <span>{m.medicine.quantityPerUnit}</span>
                                                                    <span>{m.quantity}</span>
                                                                    <span>{m.medicine.price}</span>
                                                                </div>
                                                            ))}
                                                </div>
                                                {p.receiptPrescription ? (
                                                    <div className={cx('total-price')}>
                                                        <h1 className={cx('title')}>
                                                            Tổng tiền thuốc: {p.receiptPrescription.priceTotal}
                                                        </h1>
                                                        <>
                                                            <Input
                                                                placeholder="Enter voucher..."
                                                                value={voucher}
                                                                onChange={(e) => setVoucher(e.target.value)}
                                                            />
                                                            <Button small primary>
                                                                Đã thanh toán
                                                            </Button>
                                                            <Button
                                                                small
                                                                green
                                                                onClick={() => updatePayment(p.receiptPrescription.id)}
                                                            >
                                                                Sửa voucher
                                                            </Button>
                                                        </>
                                                    </div>
                                                ) : (
                                                    <div className={cx('total-price')}>
                                                        <Input
                                                            placeholder="Enter voucher..."
                                                            value={voucher}
                                                            onChange={(e) => setVoucher(e.target.value)}
                                                        />
                                                        <Button small green onClick={() => handlePayment(p.id)}>
                                                            Thanh toán
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </>
                        ))}
                    </MyTable>
                </>
            )}
        </>
    );
}

export default Prescriptions;
