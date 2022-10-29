import React from 'react';
import convertTimestamp from '~/utils/convertTimestamp';

function List({ data, handleEdit, handleDelete, nameBoard }) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: null,
    });

    return (
        <div className="container" style={{ width: '100%' }}>
            <table className="table">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Kết luận</th>
                        <th>Triệu chứng</th>
                        <th>Ngày tạo</th>
                        <th>Mã phiếu đăng ký</th>
                        <th>Mã bác sĩ</th>
                        <th colSpan={2} className="text-center">
                            Hành động
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((item, i) => (
                            <tr key={item.id}>
                                <td>{i + 1}</td>
                                <td>{item.conclusion}</td>
                                <td>{item.symptom}</td>
                                <td>{convertTimestamp(item.createdDate)}</td>
                                <td>{item.register.id}</td>
                                <td>
                                    {item.user.id}-{item.user.firstName}
                                </td>
                                <td className="text-right">
                                    <button onClick={() => handleEdit(item.id)} className="button muted-button">
                                        Sửa
                                    </button>
                                </td>
                                <td className="text-left">
                                    <button onClick={() => handleDelete(item.id)} className="button muted-button">
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7}>No {nameBoard}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default List;
