import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import doctorService from '~/services/doctor.service';
import patientService from '~/services/patient.service';
import registerService from '~/services/register.service';
import convertTimestamp from '~/utils/convertTimestamp';

function History() {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [registers, setRegisters] = useState([]);
    const [certificates, setCertificates] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);
    const [medicineOfPres, setMedicineOfPres] = useState([]);

    useEffect(() => {
        registerService.getRegistersByCurrentUser().then(
            (res) => setRegisters(res.data),
            (error) => setRegisters(error.response.status),
        );
    }, []);

    useEffect(() => {
        if (certificates.length === 0) {
            setCertificates([]);
            registers.forEach((r) =>
                patientService
                    .getCertificatesByRegisterId(r.id)
                    .then((res) => setCertificates((prev) => [...prev, { id: r.id, cers: res.data }])),
            );
        }
    }, [registers]);

    useEffect(() => {
        if (prescriptions.length === 0) {
            setPrescriptions([]);
            certificates.forEach((certificate) =>
                certificate.cers.forEach((cer) =>
                    patientService
                        .getPrescriptionsByCertificateId(cer.id)
                        .then((res) => setPrescriptions((prev) => [...prev, { cerId: cer.id, pres: res.data }])),
                ),
            );
        }
    }, [certificates]);

    useEffect(() => {
        setMedicineOfPres([]);
        prescriptions.forEach((prescription) =>
            prescription.pres.forEach((p) =>
                patientService.getPrescriptionDetailsByPrescriptionId(p.id).then(
                    (medicines) => setMedicineOfPres((prev) => [...prev, { preId: p.id, mds: medicines.data }]),
                    (error) => setMedicineOfPres((prev) => [...prev, { preId: p.id, mds: null }]),
                ),
            ),
        );
    }, [prescriptions]);

    console.log('medicineofpre ', medicineOfPres);
    console.log('certificates ', certificates);

    if (!currentUser) {
        return <h1>Đăng nhập để xem lịch sử</h1>;
    }

    return (
        <div>
            {registers === 404 && <h1>Bạn không có lịch sử khám</h1>}
            {registers.length && (
                <Table striped bordered hove="true">
                    <thead>
                        <tr>
                            <th>Mã đăng ký</th>
                            <th>Tên bệnh nhân</th>
                            <th>Số điện thoại</th>
                            <th>Ngày đăng ký</th>
                            <th>Ngày hẹn khám</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registers.map((r) => (
                            <>
                                <tr key={r.id}>
                                    <td>{r.id}</td>
                                    <td>{r.name}</td>
                                    <td>{r.phone}</td>
                                    <td>{convertTimestamp(r.createdDate)}</td>
                                    <td>{convertTimestamp(r.examinationTime)}</td>
                                    <td>{r.verified ? <span>Đã xác nhận</span> : <span>Chưa xác nhận</span>}</td>
                                </tr>
                                <h1>Phiếu khám</h1>
                                {certificates.length &&
                                    certificates.find((c) => c.id === r.id).cers.length &&
                                    certificates
                                        .find((c) => c.id == r.id)
                                        .cers.map((cer) => (
                                            <>
                                                <Table striped bordered hove="true">
                                                    <thead>
                                                        <tr>
                                                            <th>Mã phiếu khám</th>
                                                            <th>Triệu chứng</th>
                                                            <th>Kết luận</th>
                                                            <th>Bác sĩ</th>
                                                            <th>Ngày tạo</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr key={cer.id}>
                                                            <td>{cer.id}</td>
                                                            <td>{cer.symptom}</td>
                                                            <td>{cer.conclusion}</td>
                                                            <td>
                                                                {cer.user.lastName} {cer.user.firstName}
                                                            </td>
                                                            <td>{convertTimestamp(cer.createdDate)}</td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                                <h1>Toa thuốc</h1>
                                                {prescriptions.length &&
                                                    prescriptions.find((p) => p.cerId == cer.id) !== null &&
                                                    prescriptions.find((p) => p.cerId === cer.id).pres.length &&
                                                    prescriptions
                                                        .find((p) => p.cerId === cer.id)
                                                        .pres.map((p) => (
                                                            <Table striped bordered hove="true">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Mã toa thuốc</th>
                                                                        <th>Ngày tạo</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>{p.id}</td>
                                                                        <td>{convertTimestamp(p.createdDate)}</td>
                                                                    </tr>
                                                                </tbody>
                                                                {medicineOfPres.find((m) => m.preId === p.id) && (
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

                                                                        {medicineOfPres.find((m) => m.preId === p.id)
                                                                            .mds !== null &&
                                                                            medicineOfPres
                                                                                .find((m) => m.preId === p.id)
                                                                                .mds.map((m) => (
                                                                                    <tbody>
                                                                                        <tr key={m.medicine.id}>
                                                                                            <td>{m.medicine.id}</td>
                                                                                            <td>{m.medicine.name}</td>
                                                                                            <td>{m.medicine.note}</td>
                                                                                            <td>
                                                                                                {m.medicine.unit.name}
                                                                                            </td>
                                                                                            <td>
                                                                                                {
                                                                                                    m.medicine
                                                                                                        .quantityPerUnit
                                                                                                }
                                                                                            </td>
                                                                                            <td>{m.quantity}</td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                ))}
                                                                    </Table>
                                                                )}
                                                            </Table>
                                                        ))}
                                            </>
                                        ))}
                            </>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
}

export default History;
