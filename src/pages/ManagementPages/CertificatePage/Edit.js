import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import adminService from '~/services/admin.service';

function Edit({ selected, setIsEditing, nameBoard }) {
    const id = selected.id;

    const [certificate, setCertificate] = useState({
        conclusion: selected.conclusion,
        symptom: selected.symptom,
        register: {
            id: selected.register.id,
        },
        user: {
            id: selected.user.id,
        },
    });

    const { conclusion, symptom, register, user } = certificate;

    const [users, setUsers] = useState([]);

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

        if (!conclusion || !symptom || !(register >= 0) || !(user >= 0)) {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true,
            });
        }

        // console.log(id);
        adminService.updateCertificate(id, certificate);
        setIsEditing(false);

        Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: `${id}'s data has been updated.`,
            showConfirmButton: false,
            timer: 1500,
        });
    };

    return (
        <div className="small-container">
            <form onSubmit={handleUpdate}>
                <h1>Edit {nameBoard}</h1>
                <label htmlFor="conclusion">Kết luận</label>
                <input
                    id="conclusion"
                    type="text"
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
                <label for="unit">Chọn bác sĩ:</label>
                <select id="user" name="user" onChange={(e) => onInputChange(e)}>
                    <option hidden value={selected.user.id}>
                        {selected.user.id}-{selected.user.firstName}
                    </option>
                    {users.map((u, idx) => (
                        <option key={idx} value={u.id}>
                            {u.id}-{u.firstName}
                        </option>
                    ))}
                </select>
                <label for="unit">Chọn phiếu đăng ký:</label>
                <select id="register" name="register" onChange={(e) => onInputChange(e)}>
                    <option hidden value={selected.register.id}>
                        {selected.register.id}
                    </option>
                    {users.map((u, idx) => (
                        <option key={idx} value={u.id}>
                            {u.id}-{u.firstName}
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
