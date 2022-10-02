import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import request from '~/utils/httpRequest';

import classNames from 'classnames/bind';

import styles from './ListRegisters.module.scss';
import { Button } from 'react-bootstrap';

const cx = classNames.bind(styles);

function ListRegisters() {
    const [registers, setRegisters] = useState([]);
    request.get('/registers').then((registers) => setRegisters(registers.data));

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
                <tbody>
                    {registers.map((register, index) => (
                        <tr key={index}>
                            <td>{register.name}</td>
                            <td>{register.healthIssues}</td>
                            <td>
                                <Button>Khám bệnh</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                {/* {registers.map((register, index) => (
                <tr key={index}>
                    <td>{register.name}</td>
                    <td>{register.healthIssues}</td>
                </tr>
            ))} */}
            </Table>
        </div>
    );
}

export default ListRegisters;
