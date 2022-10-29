import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import adminService from '~/services/admin.service';

function Edit({ selected, setIsEditing, nameBoard }) {
    const id = selected.id;

    const [medicine, setMedicine] = useState({
        name: selected.name,
        note: selected.note,
        price: selected.price,
        quantityPerUnit: selected.quantityPerUnit,
        unit: {
            id: selected.unit.id,
        },
        active: selected.active ? 1 : 0,
    });

    const { name, note, price, quantityPerUnit, unit, active } = medicine;

    const [units, setUnits] = useState([]);

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

    // const updateCertificate = (e) => {
    //     e.preventDefault();
    //     let cerData = Object.fromEntries(new FormData(e.target).entries());

    //     doctorService.updateCertificate(idCer, cerData).then((cer) => {
    //         if (cer.status === 200) {
    //             setChangeCer(changeCer + 1);
    //         }
    //     });

    //     setIdCer(null);
    // };

    const handleUpdate = (e) => {
        e.preventDefault();

        if (!name || !note || !price || !quantityPerUnit || !(active >= 0) || !(unit.id >= 0)) {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true,
            });
        }

        // console.log(id);
        adminService.updateMedicine(id, medicine);
        setIsEditing(false);

        Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: `${name}'s data has been updated.`,
            showConfirmButton: false,
            timer: 1500,
        });
    };

    return (
        <div className="small-container">
            <form onSubmit={handleUpdate}>
                <h1>Edit {nameBoard}</h1>
                <label htmlFor="name">Tên</label>
                <input id="name" type="text" name="name" value={name} onChange={(e) => onInputChange(e)} />
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
                    <option hidden value={selected.unit.name}>
                        {selected.unit.name}
                    </option>
                    {units.map((u, idx) => (
                        <option key={idx} value={u.id}>
                            {u.name}
                        </option>
                    ))}
                </select>
                <label htmlFor="active">Active</label>
                {/* <input
                    id="active"
                    type="number"
                    name="active"
                    value={active}
                    onChange={(e) => onInputChange(e)}

                    // value={salary}
                    // onChange={(e) => setSalary(e.target.value)}
                /> */}
                <select id="active" name="active" onChange={(e) => onInputChange(e)}>
                    <option hidden value={active}>
                        {selected.active ? 'Còn hạn' : 'Hết hạn'}
                    </option>
                    {[1, 0].map((u, idx) => (
                        <option key={idx} value={u}>
                            {u ? 'Còn hạn' : 'Hết hạn'}
                        </option>
                    ))}
                </select>
                <div style={{ marginTop: '30px' }}>
                    <input type="submit" value="Update" />
                    <input
                        style={{ marginLeft: '12px' }}
                        className="muted-button"
                        type="button"
                        value="Cancel"
                        onClick={() => setIsEditing(false)}
                    />
                </div>
            </form>
        </div>
    );
}

export default Edit;
