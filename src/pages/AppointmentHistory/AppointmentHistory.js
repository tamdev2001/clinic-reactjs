import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Button from '~/components/Button';
import Search from '~/layouts/components/Search';
import nurseService from '~/services/nurse.service';
import registerService from '~/services/register.service';
import convertTimestamp from '~/utils/convertTimestamp';

function AppointmentHistory() {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [registers, setRegisters] = useState([]);
    const [stateRegister, setStateRegister] = useState(0);

    useEffect(() => {
        registerService.getRegistersByCurrentUser().then(
            (res) => setRegisters(res.data),
            (error) => setRegisters(error.response.data),
        );
    }, [stateRegister]);

    const handleVerified = (registerId) => {
        nurseService
            .verifiedRegister(registerId)
            .then((res) => {
                setStateRegister((prev) => prev + 1);
                return res.data;
            })
            .then((data) => alert(`Đã xác nhận và gửi mail đến ${data.email} cho bệnh nhân ${data.name}`));
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
                            <th>Ngày đăng ký</th>
                            <th>Ngày hẹn</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registers.map((r) => (
                            <tr>
                                <td>{r.id}</td>
                                <td>{r.name}</td>
                                <td>{r.phone}</td>
                                <td>{convertTimestamp(r.createdDate)}</td>
                                <td>{convertTimestamp(r.examinationTime)}</td>
                                <td>
                                    {r.verified ? (
                                        <Button small green>
                                            Đã xác nhận
                                        </Button>
                                    ) : (
                                        <Button small primary onClick={() => handleVerified(r.id)}>
                                            Chưa xác nhận
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
}

export default AppointmentHistory;
