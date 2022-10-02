import classNames from 'classnames/bind';
import { useState } from 'react';
import { Form } from 'react-bootstrap';

import styles from './FormInput.module.scss';

const cx = classNames.bind(styles);

function FormInput({ lable, type = 'text', placeholder, name }) {
    return (
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>{lable}</Form.Label>
            <Form.Control name={name} type={type} placeholder={placeholder} />
        </Form.Group>
    );
}

export default FormInput;
