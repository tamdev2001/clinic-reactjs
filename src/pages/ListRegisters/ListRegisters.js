import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import request from '~/utils/httpRequest';

import { Navigate, useNavigate } from 'react-router-dom';

import RegisterService from '~/services/register.service';

import classNames from 'classnames/bind';

import styles from './ListRegisters.module.scss';
import Button from '~/components/Button';
import config from '~/config';
import Examination from '../Examination';

const cx = classNames.bind(styles);

function ListRegisters() {
    const [registers, setRegisters] = useState([]);
    const [registerId, setRegisterId] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        RegisterService.getListRegisters().then(
            (res) => {
                setRegisters(res.data);
            },
            (error) => {
                const message =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();

                setRegisters(message);
            },
        );
    }, []);

    const handleExamination = (register) => {
        return navigate(config.routes.examination, { state: { register } });
    };

    return (
        <div className={cx('wrapper')}>
            <h1>Danh sách khám bệnh</h1>
            <Table striped bordered hove="true">
                <thead>
                    <tr>
                        <th>Tên bệnh nhân</th>
                        <th>Triệu chứng bệnh</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody style={{ alignItem: 'center' }}>
                    {registers.map((register, index) => (
                        <tr key={index}>
                            <td>{register.name}</td>
                            <td>{register.healthIssues}</td>
                            <td>
                                <Button
                                    login
                                    small
                                    onClick={() => {
                                        handleExamination(register);
                                    }}
                                >
                                    Khám bệnh
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default ListRegisters;
