import React, { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';
import adminService from '~/services/admin.service';

function Add({ setIsAdding, nameBoard }) {
    // const [name, setName] = useState('');
    // const [note, setNote] = useState('');
    // const [price, setPrice] = useState(0);
    // const [quantityPerUnit, setQuantityPerUnit] = useState(0);
    // const [actived, setActived] = useState(1);
    const [medicine, setMedicine] = useState({
        name: 'cc',
        note: 'cc',
        price: 3,
        quantityPerUnit: 3,
        unit: {
            id: 1,
        },
        active: true,
    });

    const { name, note, price, quantityPerUnit, unit, active } = medicine;

    const [units, setUnits] = useState([]);

    const textInput = useRef(null);

    useEffect(() => {
        textInput.current.focus();
    }, []);

    useEffect(() => {
        adminService.getUnits().then((res) => setUnits(res.data));
    }, []);

    const onInputChange = (e) => {
        if (e.target.name === 'unit') {
            setMedicine({
                ...medicine,
                [e.target.name]: { id: e.target.value },
            });
        } else {
            setMedicine({
                ...medicine,
                [e.target.name]: e.target.value,
            });
        }
    };

    // const createMedicine = (e) => {
    //     e.preventDefault();
    //     let mData = Object.fromEntries(new FormData(e.target).entries());

    //     adminService.createMedicine(mData);
    // };

    const handleAdd = (e) => {
        e.preventDefault();
        if (!name || !note || !price || !quantityPerUnit || !active || !unit) {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true,
            });
        }

        // let mData = Object.fromEntries(new FormData(e.target).entries());

        adminService.createMedicine(medicine);
        console.log(medicine);

        setIsAdding(false);

        Swal.fire({
            icon: 'success',
            title: 'Added!',
            text: `${name}'s data has been Added.`,
            showConfirmButton: false,
            timer: 1500,
        });
    };

    return (
        <div className="container">
            <form onSubmit={(e) => handleAdd(e)}>
                <h1>Add {nameBoard}</h1>
                <label htmlFor="name">Tên</label>
                <input
                    id="name"
                    type="text"
                    ref={textInput}
                    name="name"
                    value={name}
                    onChange={(e) => onInputChange(e)}
                />
                <label htmlFor="note">Ghi chú</label>
                <input
                    id="note"
                    type="text"
                    name="note"
                    value={note}
                    onChange={(e) => onInputChange(e)}

                    // value={lastName}
                    // onChange={(e) => setLastName(e.target.value)}
                />
                <label htmlFor="price">Giá</label>
                <input
                    id="price"
                    type="number"
                    name="price"
                    value={price}
                    onChange={(e) => onInputChange(e)}

                    // value={email} onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="quantityPerUnit">Số lượng/Đơn vị</label>
                <input
                    id="quantityPerUnit"
                    type="number"
                    name="quantityPerUnit"
                    value={quantityPerUnit}
                    onChange={(e) => onInputChange(e)}

                    // value={salary}
                    // onChange={(e) => setSalary(e.target.value)}
                />
                <label for="unit">Chọn đơn vị:</label>
                <select id="unit" name="unit" onChange={(e) => onInputChange(e)}>
                    {units.map((u, idx) => (
                        <option key={idx} value={u.id}>
                            {u.name}
                        </option>
                    ))}
                </select>
                <label htmlFor="active">Active</label>
                <select id="active" name="active" onChange={(e) => onInputChange(e)}>
                    {[true, false].map((u, idx) => (
                        <option key={idx} value={u}>
                            {u ? 'Còn hạn' : 'Hết hạn'}
                        </option>
                    ))}
                </select>
                <div style={{ marginTop: '30px' }}>
                    <input type="submit" value="Add" />
                    <input
                        style={{ marginLeft: '12px' }}
                        className="muted-button"
                        type="button"
                        value="Cancel"
                        onClick={() => setIsAdding(false)}
                    />
                </div>
            </form>
        </div>
    );
}

export default Add;
