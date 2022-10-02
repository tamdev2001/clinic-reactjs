import { Button, Form } from 'react-bootstrap';
import request from '~/utils/httpRequest';
import classNames from 'classnames/bind';

import styles from './Register.module.scss';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Register() {
    console.log('rerender');
    let navigate = useNavigate();

    const nameRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const registerData = Object.fromEntries(new FormData(e.target).entries());

        request.post('registers', registerData).then((register) => {
            if (register.status === 201) {
                return navigate('/');
            }
        });
    };
    return (
        <div className={cx('wrapper')}>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Họ tên</Form.Label>
                    <Form.Control name="name" type="text" placeholder="Họ tên" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control name="phone" type="text" placeholder="Số điện thoại" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Triệu chứng</Form.Label>
                    <Form.Control name="healthIssues" type="text" placeholder="Triệu chứng" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Ngày hẹn khám</Form.Label>
                    <Form.Control name="examinationTime" type="date" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </div>
    );
}

export default Register;
