import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '~/components/Button';
import MyTable from '~/components/MyTable';
import registerService from '~/services/register.service';
import convertTimestamp from '~/utils/convertTimestamp';

import styles from './Booked.module.scss';

const cx = classNames.bind(styles);

function Booked() {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [registers, setRegisters] = useState([]);

    useEffect(() => {
        registerService.getRegistersByCurrentUser().then(
            (res) => setRegisters(res.data),
            (error) => setRegisters(error.response.status),
        );
    }, []);

    if (!currentUser) {
        return <h1>Đăng nhập để xem lịch sử</h1>;
    }

    return (
        <div className={cx('wrapper')}>
            {registers === 404 && <h1>Bạn chưa có cuộc hẹn nào với bác sĩ</h1>}
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
                                <Button green small>
                                    Sửa
                                </Button>
                                <Button green small>
                                    Xóa
                                </Button>
                            </tr>
                        ))}
                    </MyTable>
                </div>
            )}
        </div>
    );
}

export default Booked;
