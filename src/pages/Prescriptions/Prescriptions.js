import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import Button from '~/components/Button';
import MyTable from '~/components/MyTable';
import Search from '~/layouts/components/Search';
import commonService from '~/services/common.service';
import nurseService from '~/services/nurse.service';
import paymentService from '~/services/payment.service';
import convertTimestamp from '~/utils/convertTimestamp';
import styles from './Prescriptions.module.scss';

const cx = classNames.bind(styles);

function Prescriptions() {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [prescriptions, setPrescription] = useState([]);
    const [statePre, setStatePre] = useState(0);
    const [medicineOfPres, setMedicineOfPres] = useState([]);
    const [payment, setPayment] = useState('');

    useEffect(() => {
        nurseService.getPrescriptions().then((res) => setPrescription(res.data));
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
        paymentService.handlePayment(preId).then((res) => setPayment(res.data));
    };

    if (currentUser.roles.find((r) => r === 'ROLE_NURSE') === undefined) {
        return <h1>Please login with nurse role</h1>;
    }

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
                                    <td>
                                        {p.receiptPrescription ? (
                                            <Button small primary>
                                                Đã thanh toán
                                            </Button>
                                        ) : (
                                            <Button small green onClick={() => handlePayment(p.id)}>
                                                Thanh toán
                                            </Button>
                                        )}
                                    </td>
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
                                                {p.receiptPrescription && (
                                                    <div className={cx('total-price')}>
                                                        Tổng tiền thuốc: {p.receiptPrescription.priceTotal}
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
