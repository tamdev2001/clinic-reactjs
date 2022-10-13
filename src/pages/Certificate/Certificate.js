import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router-dom';
import Button from '~/components/Button';
import Input from '~/components/Input';
import doctorService from '~/services/doctor.service';
import convertTimestamp from '~/utils/convertTimestamp';

import styles from './Certificate.module.scss';

const cx = classNames.bind(styles);

function Certificate() {
    const { state } = useLocation();
    const { cerId } = useParams();
    const [cers, setCers] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);
    const [preId, setPreId] = useState();
    const [statusPre, setStatusPre] = useState('');
    const [statusMedicine, setStatusMedicine] = useState('');
    const [medicines, setMedicines] = useState([]);
    const [changePre, setChangePre] = useState(0);
    const [changeMedicine, setChangeMedicine] = useState(0);
    const [medicineOfPres, setMedicineOfPres] = useState([{ id: null, mds: null }]);
    const [quantity, setQuantity] = useState(0);
    const [isChange, setIsChange] = useState(false);

    useEffect(() => {
        doctorService.getCertificateById(cerId).then(
            (res) => setCers(res.data),
            (error) => {
                setStatusPre(error.response.status);
                setPrescriptions(null);
            },
        );
    }, []);

    useEffect(() => {
        doctorService.getPrescriptionsByCertificateId(cerId).then((res) => {
            setPrescriptions(res.data);
        });
    }, [changePre]);

    useEffect(() => {
        if (prescriptions.length !== 0) {
            setMedicineOfPres([]);
            prescriptions.forEach((p) =>
                doctorService.getPrescriptionDetailsByPrescriptionId(p.id).then(
                    (medicines) => setMedicineOfPres((prev) => [...prev, { id: p.id, mds: medicines.data }]),
                    (error) => setMedicineOfPres((prev) => [...prev, { id: p.id, mds: null }]),
                ),
            );
        }
    }, [prescriptions, changeMedicine]);

    const createPrescription = () => {
        doctorService.createPrescription(cerId).then((res) => setChangePre(changePre + 1));
    };

    const deletePrescription = (preId) => {
        doctorService.deletePrescription(preId).then((res) => {
            if (res.data) {
                setChangePre(changePre + 1);
            }
        });
    };

    const getMedicine = (preId) => {
        doctorService.getMedicines().then((medicine) => {
            setMedicines(medicine.data);
            setPreId(preId);
        });
    };

    const addMedicineToPresciption = (medicineId) => {
        doctorService.addMedicineToPresciption(preId, medicineId).then((res) => setChangeMedicine(changeMedicine + 1));
    };

    const removeMedicine = (preId, medicineId) => {
        doctorService
            .removeMedicineFromPresciption(preId, medicineId)
            .then((res) => setChangeMedicine(changeMedicine + 1));
    };

    return (
        <div>
            <h1>Mã bệnh nhân: {state.register.id}</h1>
            <h1>Tên bệnh nhân: {state.register.name}</h1>
            <br />
            {cers && (
                <>
                    <h1>Mã phiếu khám: {cers.id}</h1>
                    <h2>Triệu chứng: {cers.symptom}</h2>
                    <h2>Kết luận: {cers.conclusion}</h2>
                </>
            )}
            <br />
            <h1>=============Toa thuốc========</h1>
            {prescriptions ? (
                <div>
                    <>
                        <Table striped bordered hove="true">
                            <thead>
                                <tr>
                                    <th>Mã toa thuốc</th>
                                    <th>Ngày tạo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {prescriptions.map((pre, index) => (
                                    <>
                                        <tr key={index}>
                                            <td>{pre.id}</td>
                                            <td>{convertTimestamp(pre.createdDate)}</td>
                                            <td>
                                                <Button
                                                    small
                                                    login
                                                    onClick={() => {
                                                        getMedicine(pre.id);
                                                    }}
                                                >
                                                    Thêm thuốc
                                                </Button>
                                            </td>
                                            <td>
                                                <Button
                                                    small
                                                    login
                                                    onClick={() => {
                                                        deletePrescription(pre.id);
                                                    }}
                                                >
                                                    Xóa
                                                </Button>
                                            </td>
                                        </tr>
                                        {medicineOfPres.find((m) => m.id === pre.id) && (
                                            <Table striped bordered hove="true">
                                                <thead>
                                                    <tr>
                                                        <th>Mã thuốc</th>
                                                        <th>Tên thuốc thuốc</th>
                                                        <th>Ghi chú</th>
                                                        <th>Đơn vị</th>
                                                        <th>Số lượng trên đơn vị</th>
                                                        <th>Số lượng</th>
                                                    </tr>
                                                </thead>

                                                {medicineOfPres.find((m) => m.id === pre.id).mds !== null &&
                                                    medicineOfPres
                                                        .find((m) => m.id === pre.id)
                                                        .mds.map((m) => (
                                                            <tbody>
                                                                <tr key={m.medicine.id}>
                                                                    <td>{m.medicine.id}</td>
                                                                    <td>{m.medicine.name}</td>
                                                                    <td>{m.medicine.note}</td>
                                                                    <td>{m.medicine.unit.name}</td>
                                                                    <td>{m.medicine.quantityPerUnit}</td>
                                                                    <td>
                                                                        <Input
                                                                            value={m.quantity}
                                                                            onChange={(e) =>
                                                                                setQuantity(e.target.value)
                                                                            }
                                                                            type="number"
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <Button
                                                                            onClick={() =>
                                                                                removeMedicine(pre.id, m.medicine.id)
                                                                            }
                                                                        >
                                                                            Xóa
                                                                        </Button>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        ))}
                                            </Table>
                                        )}
                                    </>
                                ))}
                            </tbody>
                        </Table>
                        {medicines.length && (
                            <Table striped bordered hove="true">
                                <thead>
                                    <tr>
                                        <th>Mã thuốc</th>
                                        <th>Tên thuốc</th>
                                        <th>Cách dùng thuốc</th>
                                        <th>Giá</th>
                                        <th>Đơn vị</th>
                                        <th>Số lượng trên đơn vị</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {medicines.map((medicine) => (
                                        <tr
                                            className={cx('add-medicine')}
                                            onClick={() => addMedicineToPresciption(medicine.id)}
                                            key={medicine.id}
                                        >
                                            <td>{medicine.id}</td>
                                            <td>{medicine.name}</td>
                                            <td>{medicine.note}</td>
                                            <td>{medicine.price}</td>
                                            <td>{medicine.unit.name}</td>
                                            <td>{medicine.quantityPerUnit}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </>
                </div>
            ) : (
                <h3>Chưa có toa thuóc</h3>
            )}

            <Button onClick={createPrescription} login>
                Thêm toa thuốc
            </Button>
        </div>
    );
}

export default Certificate;
