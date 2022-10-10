import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router-dom';
import Button from '~/components/Button';
import doctorService from '~/services/doctor.service';
import convertTimestamp from '~/utils/convertTimestamp';

import styles from './Certificate.module.scss';

const cx = classNames.bind(styles);

function Certificate() {
    const { state } = useLocation();
    const { cerId } = useParams();
    const [cer, setCer] = useState();
    const [prescriptions, setPrescriptions] = useState();
    const [statusPre, setStatusPre] = useState('');
    const [statusMedicine, setStatusMedicine] = useState('');
    const [medicines, setMedicines] = useState();
    const [changePre, setChangePre] = useState(0);

    useEffect(() => {
        doctorService.getCertificateById(cerId).then(
            (res) => setCer(res.data),
            (error) => {
                setStatusPre(error.response.status);
                setPrescriptions(null);
            },
        );
    }, []);

    useEffect(() => {
        doctorService.getPrescriptionsByCertificateId(cerId).then((res) => setPrescriptions(res.data));
    }, [changePre]);

    const createPrescription = () => {};

    const deletePrescription = (preId) => {
        doctorService.deletePrescription(preId).then((res) => {
            if (res.data) {
                setChangePre(changePre + 1);
            }
        });
    };

    const addMedicineToPresciption = (preId) => {
        doctorService.getMedicines().then(
            (res) => setMedicines(res.data),
            (error) => setStatusMedicine(error.response.status),
        );
    };

    console.log('re-render');
    return (
        <div>
            <h1>Mã bệnh nhân: {state.register.id}</h1>
            <h1>Tên bệnh nhân: {state.register.name}</h1>
            <br />
            {cer && (
                <>
                    <h1>Mã phiếu khám: {cer.id}</h1>
                    <h2>Triệu chứng: {cer.symptom}</h2>
                    <h2>Kết luận: {cer.conclusion}</h2>
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
                                    <tr key={index}>
                                        <td>{pre.id}</td>
                                        <td>{convertTimestamp(pre.createdDate)}</td>
                                        <td>
                                            <Button
                                                small
                                                onClick={() => {
                                                    addMedicineToPresciption(pre.id);
                                                }}
                                            >
                                                Thêm thuốc
                                            </Button>
                                        </td>
                                        <td>
                                            <Button
                                                small
                                                onClick={() => {
                                                    deletePrescription(pre.id);
                                                }}
                                            >
                                                Xóa
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        {medicines && (
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
                                        <tr key={medicine.id}>
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
