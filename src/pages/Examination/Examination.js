import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Examination.mudule.scss';

import Button from '~/components/Button';

import convertTimestamp from '~/utils/convertTimestamp';

import DoctorService from '~/services/doctor.service';
import config from '~/config';
import doctorService from '~/services/doctor.service';
import Input from '~/components/Input';

const cx = classNames.bind(styles);

function Examination() {
    const [certificates, setCertificates] = useState([]);
    const [changeCer, setChangeCer] = useState(0);
    const [statusCer, setStatusCer] = useState();
    const [idRegister, setIdRegister] = useState(null);
    const [idCer, setIdCer] = useState(null);

    const [symptom, setSymptom] = useState('');
    const [conclusion, setConclusion] = useState('');

    console.log('cer ', idCer);
    console.log('Register ', idRegister);

    const { state } = useLocation();

    console.log('re-render');

    let navigate = useNavigate();

    useEffect(() => {
        console.log('get ', certificates);
        DoctorService.getCertificatesByRegisterId(state.register.id).then(
            (res) => setCertificates(res.data),
            (error) => setStatusCer(error.response.status),
        );
    }, [changeCer]);

    console.log('ouside ', certificates);

    const createCertificate = (e) => {
        e.preventDefault();
        let cerData = Object.fromEntries(new FormData(e.target).entries());

        doctorService.createCertificate(idRegister, cerData).then((cer) => {
            if (cer.status === 201) {
                setChangeCer(changeCer + 1);
            }
        });

        setIdRegister(null);
    };

    const updateCertificate = (e) => {
        e.preventDefault();
        let cerData = Object.fromEntries(new FormData(e.target).entries());

        doctorService.updateCertificate(idCer, cerData).then((cer) => {
            if (cer.status === 200) {
                setChangeCer(changeCer + 1);
            }
        });

        setIdCer(null);
    };

    const deleteCertificate = (certificateId) => {
        let result = doctorService.deleteCertificate(certificateId).then((res) => {
            if (result) {
                setChangeCer(changeCer + 1);
            }
        });
    };

    const cerDetailt = (cerId) => {
        return navigate(`${config.routes.cer}/${cerId}`, { state: state });
    };

    return (
        <div>
            <h1>Patient name: {state.register.name}</h1>
            <h3>Health Issues: {state.register.healthIssues}</h3>
            <br />
            <br />
            <br />
            <h1>certificates</h1>
            {statusCer === 404 ? (
                <h3>Bệnh nhân chưa có phiếu khám</h3>
            ) : (
                <Table striped bordered hove="true">
                    <thead>
                        <tr>
                            <th>Mã phiếu khám</th>
                            <th>Triệu chứng</th>
                            <th>Kết luận</th>
                            <th>Ngày tạo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {certificates.map((cer, index) => (
                            <tr
                                key={index}
                                className={cx('cer')}
                                onClick={() => {
                                    cerDetailt(cer.id);
                                }}
                            >
                                <td>{cer.id}</td>
                                <td>{cer.symptom}</td>
                                <td>{cer.conclusion}</td>
                                <td>{convertTimestamp(cer.createdDate)}</td>
                                <td>
                                    <Button
                                        login
                                        small
                                        onClick={() => {
                                            setIdCer(cer.id);
                                            setConclusion(cer.conclusion);
                                            setSymptom(cer.symptom);
                                            setIdRegister = null;
                                        }}
                                    >
                                        Chỉnh sửa
                                    </Button>
                                </td>
                                <td>
                                    <Button login small onClick={() => deleteCertificate(cer.id)}>
                                        Xóa
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            <br />
            <br />
            <br />
            <Button
                login
                small
                onClick={() => {
                    setIdRegister(state.register.id);
                    setIdCer = null;
                }}
            >
                Tạo phiếu khám
            </Button>
            {idRegister && (
                <form onSubmit={createCertificate}>
                    <Input name="symptom" placeholder="Triệu chứng..." />
                    <Input name="conclusion" placeholder="Kết luận..." />
                    <Button>Tạo phiếu khám</Button>
                </form>
            )}
            {idCer && (
                <form onSubmit={updateCertificate}>
                    <Input
                        value={symptom}
                        name="symptom"
                        placeholder="Triệu chứng..."
                        onChange={(e) => setSymptom(e.target.value)}
                    />
                    <Input
                        value={conclusion}
                        name="conclusion"
                        placeholder="Kết luận..."
                        onChange={(e) => setConclusion(e.target.value)}
                    />
                    <Button>Sửa phiếu khám</Button>
                </form>
            )}
        </div>
    );
}

export default Examination;
