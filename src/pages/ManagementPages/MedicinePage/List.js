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
                        <th>Tên</th>
                        <th>Ghi chú</th>
                        <th>Giá</th>
                        <th>Số lượng/đơn vị</th>
                        <th>Đơn vị</th>
                        <th>Còn dùng</th>
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
                                <td>{item.name}</td>
                                <td>{item.note}</td>
                                <td>{formatter.format(item.price)}</td>
                                <td>{item.quantityPerUnit}</td>
                                <td>{item.unit.name}</td>
                                <td>{item.active ? 'Còn hạn' : 'Hết hạn'}</td>
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
