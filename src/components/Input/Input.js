import classNames from 'classnames/bind';

import styles from './Input.module.scss';

const cx = classNames.bind(styles);

function Input({ type, name, placeholder, lable, ...passProps }) {
    return (
        <div className={cx('wrap-input')}>
            <label htmlFor={name}>{lable}</label>
            <input className={cx('input')} type={type} name={name} placeholder={placeholder} {...passProps} />
        </div>
    );
}

export default Input;
