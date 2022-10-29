import React from 'react';

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
                        <th>Họ</th>
                        <th>Tên</th>
                        <th>SĐT</th>
                        <th>Giới tính</th>
                        <th>Email</th>
                        <th>Tài khoản</th>
                        <th>Mật khẩu</th>
                        <th>Ảnh đại diện</th>
                        <th colSpan={2} className="text-center">
                            Hành động
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((item, i) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.lastName}</td>
                                <td>{item.firstName}</td>
                                <td>{item.phone}</td>
                                <td>{item.sex}</td>
                                <td>{item.email}</td>
                                <td>{item.username}</td>
                                <td>{item.password}</td>
                                <td>{item.avatar}</td>
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
