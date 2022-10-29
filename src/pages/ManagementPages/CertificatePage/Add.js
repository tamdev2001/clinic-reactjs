import React, { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';
import adminService from '~/services/admin.service';

function Add({ setIsAdding, nameBoard }) {
    // const [name, setName] = useState('');
    // const [note, setNote] = useState('');
    // const [price, setPrice] = useState(0);
    // const [quantityPerUnit, setQuantityPerUnit] = useState(0);
    // const [actived, setActived] = useState(1);
    const [certificate, setCertificate] = useState({
        conclusion: 'cc',
        symptom: 3,
        register: {
            id: 1,
        },
        user: {
            id: 1,
        },
    });

    const { conclusion, symptom, register, user } = certificate;

    const [users, setUsers] = useState([]);

    const textInput = useRef(null);

    useEffect(() => {
        textInput.current.focus();
    }, []);

    useEffect(() => {
        adminService.getUsersByRoleId(2).then((res) => setUsers(res.data));
    }, []);

    const onInputChange = (e) => {
        if (e.target.name === 'unit') {
            setCertificate({
                ...certificate,
                [e.target.name]: { id: e.target.value },
            });
        } else {
            setCertificate({
                ...certificate,
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
        if (!conclusion || !symptom || !(register >= 0) || !(user >= 0)) {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true,
            });
        }

        // let mData = Object.fromEntries(new FormData(e.target).entries());

        adminService.createCertificate(certificate);
        console.log(certificate);

        setIsAdding(false);

        Swal.fire({
            icon: 'success',
            title: 'Added!',
            text: 'Data has been Added.',
            showConfirmButton: false,
            timer: 1500,
        });
    };

    return (
        <div className="container">
            <form onSubmit={(e) => handleAdd(e)}>
                <h1>Add {nameBoard}</h1>
                <label htmlFor="name">Kết luận</label>
                <input
                    id="conclusion"
                    type="text"
                    ref={textInput}
                    name="conclusion"
                    value={conclusion}
                    onChange={(e) => onInputChange(e)}
                />
                <label htmlFor="symptom">Triệu chứng</label>
                <input
                    id="symptom"
                    type="text"
                    name="symptom"
                    value={symptom}
                    onChange={(e) => onInputChange(e)}

                    // value={lastName}
                    // onChange={(e) => setLastName(e.target.value)}
                />
                <label for="user">Chọn bác sĩ lập phiếu :</label>
                <select id="user" name="user" onChange={(e) => onInputChange(e)}>
                    {users.map((u, idx) => (
                        <option key={idx} value={u.id}>
                            {u.username}
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
