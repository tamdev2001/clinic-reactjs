import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Button from '~/components/Button';
import Form from '~/components/Form';
import FormTitle from '~/components/FormTitle';
import Input from '~/components/Input';
import MyTable from '~/components/MyTable';
import registerService from '~/services/register.service';
import convertTimestamp from '~/utils/convertTimestamp';

import styles from './Booked.module.scss';

const cx = classNames.bind(styles);

function Booked() {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [registers, setRegisters] = useState([]);
    const [registerId, setRegisterId] = useState();
    const [stateRegister, setStateRegister] = useState(0);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        registerService.getRegistersByCurrentUser().then(
            (res) => setRegisters(res.data),
            (error) => setRegisters(error.response.status),
        );
    }, [stateRegister]);

    const deleteRegister = (registerId) => {
        registerService.deleteRegister(registerId).then(() => setStateRegister((pre) => pre + 1));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleClose();
        const registerData = Object.fromEntries(new FormData(e.target).entries());
        registerService.updateRegister(registerId, registerData).then(() => setStateRegister((pre) => pre + 1));
    };

    if (!currentUser) {
        return <h1>Đăng nhập để xem lịch sử</h1>;
    }

    return (
        <div className={cx('wrapper')}>
            {(registers === 404 && currentUser.roles.find((r) => r === 'ROLE_PATIENT') && (
                <h1>Bạn chưa có cuộc hẹn nào với bác sĩ</h1>
            )) ||
                (currentUser.roles.find((r) => r === 'ROLE_NURSE') && <h1>Bạn chưa đăng ký khám cho bệnh nhân nào</h1>)}
            {registers.length && (
                <div>
                    <MyTable
                        green
                        title="Lịch sử khám bệnh"
                        headings={[
                            'Mã đăng ký',
                            'Tên bệnh nhân',
                            'Số điện',
                            'Ngày đăng ký',
                            'Ngày hẹn khám',
                            'Trạng thái',
                        ]}
                    >
                        {registers.map((r) => (
                            <tr key={r.id}>
                                <td>{r.id}</td>
                                <td>{r.name}</td>
                                <td>{r.phone}</td>
                                <td>{convertTimestamp(r.createdDate)}</td>
                                <td>{convertTimestamp(r.examinationTime)}</td>
                                <td>{r.verified ? <span>Đã xác nhận</span> : <span>Chưa xác nhận</span>}</td>
                                <Button
                                    green
                                    small
                                    onClick={() => {
                                        setRegisterId(r.id);
                                        handleShow();
                                    }}
                                >
                                    Sửa
                                </Button>
                                <Button green small onClick={() => deleteRegister(r.id)}>
                                    Xóa
                                </Button>
                            </tr>
                        ))}
                    </MyTable>
                </div>
            )}
            <Offcanvas show={show} onHide={handleClose} placement="top">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Đăng ký khám</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className={cx('wrapper')}>
                        <Form onSubmit={handleSubmit}>
                            <FormTitle>Make a appointment</FormTitle>
                            <Input name="name" placeholder="Enter name" />
                            <Input name="phone" placeholder="Enter phone" />
                            <Input name="healthIssues" placeholder="Enter issues" />
                            <Input name="examinationTime" type="date" />
                            <Button login type="submit">
                                Appointment
                            </Button>
                        </Form>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default Booked;
