import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '~/components/Button';

import convertTimestamp from '~/utils/convertTimestamp';

import DoctorService from '~/services/doctor.service';
import config from '~/config';
import doctorService from '~/services/doctor.service';

function Examination() {
    const [certificates, setCertificates] = useState([]);
    const [stateDelete, setStateDelete] = useState(0);
    const [statusCer, setStatusCer] = useState();
    const { state } = useLocation();

    console.log('re-render');

    let navigate = useNavigate();

    useEffect(() => {
        console.log('get ', certificates);
        DoctorService.getCertificatesByRegisterId(state.register.id).then(
            (res) => setCertificates(res.data),
            (error) => setStatusCer(error.response.status),
        );
    }, [stateDelete]);

    console.log('ouside ', certificates);

    const handleCertificate = (registerId) => {
        return navigate(config.routes);
    };

    const deleteCertificate = (certificateId) => {
        let result = doctorService.deleteCertificate(certificateId).then((res) => {
            if (result) {
                setStateDelete(stateDelete + 1);
            }
        });
    };

    // console.log('delete outside ', stateDelete);

    const updateCertificate = (certificateId) => {};

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
                            <th>Triệu chứng</th>
                            <th>Kết luận</th>
                            <th>Ngày tạo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {certificates.map((cer, index) => (
                            <tr key={index}>
                                <td>{cer.symptom}</td>
                                <td>{cer.conclusion}</td>
                                <td>{convertTimestamp(cer.createdDate)}</td>
                                <td>
                                    <Button login small>
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
            <Button login small onClick={() => handleCertificate(state.register.id)}>
                Tạo phiếu khám
            </Button>
        </div>
    );
}

export default Examination;
