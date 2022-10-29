import React, { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';
import routes from '~/config/routes';
import adminService from '~/services/admin.service';
import request from '~/utils/httpRequest';

function Add({ setIsAdding, nameBoard }) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [sex, setSex] = useState('Nam');
    const [comfirmPassword, setConfirmPassword] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [file, setFile] = useState();
    const [roles, setRoles] = useState([]);

    const textInput = useRef(null);

    useEffect(() => {
        textInput.current.focus();
    }, []);

    // const createUser = (e) => {
    //     e.preventDefault();
    //     let mData = Object.fromEntries(new FormData(e.target).entries());

    //     adminService.createUser(mData);
    // };
    // State with list of all checked item
    useEffect(() => {
        let roles = [
            { id: 2, name: 'ROLE_DOCTOR' },
            { id: 3, name: 'ROLE_NURSE' },
            { id: 4, name: 'ROLE_ADMIN' },
        ];

        setRoles(
            roles.map((d) => {
                return {
                    select: false,
                    id: d.id,
                    name: d.name,
                };
            }),
        );
    }, []);

    const handleAdd = (e) => {
        // e.preventDefault();
        // if (!name || !note || !price || !quantityPerUnit || !active || !unit) {
        //     return Swal.fire({
        //         icon: 'error',
        //         title: 'Error!',
        //         text: 'All fields are required.',
        //         showConfirmButton: true,
        //     });
        // }

        // let mData = Object.fromEntries(new FormData(e.target).entries());
        const arrRole = [];
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].select === true) {
                arrRole.push(roles[i].id);
                console.log(arrRole);
            }
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('username', username);
        formData.append('password', password);
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('sex', sex);
        formData.append('email', email);
        formData.append('comfirmPassword', comfirmPassword);
        formData.append('phone', phone);
        formData.append('roles', arrRole);

        request.post('/admin/users', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        setIsAdding(false);

        // Swal.fire({
        //     icon: 'success',
        //     title: 'Added!',
        //     text: `${name}'s data has been Added.`,
        //     showConfirmButton: false,
        //     timer: 1500,
        // });
    };

    return (
        <div className="container">
            <form onSubmit={(e) => handleAdd(e)}>
                <h1>Add {nameBoard}</h1>
                <label htmlFor="lastName">Họ</label>
                <input
                    id="lastName"
                    type="text"
                    ref={textInput}
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <label htmlFor="firstName">Tên</label>
                <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <label htmlFor="phone">SĐT</label>
                <input id="phone" type="text" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <label for="sex">Giới tính:</label>
                <select id="sex" name="sex" onChange={(e) => setSex(e.target.value)}>
                    {['Nam', 'Nữ'].map((u, idx) => (
                        <option key={idx} value={u}>
                            {u}
                        </option>
                    ))}
                </select>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="username">Tài khoản</label>
                <input
                    id="username"
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="password">Mật khẩu</label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Nhập mật khẩu..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="comfirmPassword">Xác nhận mật khẩu</label>
                <input
                    type="password"
                    name="comfirmPassword"
                    placeholder="Xác nhận lại mật khẩu..."
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <label htmlFor="avatar">Ảnh đại diện</label>
                <input
                    name="file"
                    placeholder="Choose avatar..."
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <label htmlFor="roles">Chọn quyền</label>
                {roles.map((item, idx) => (
                    <div key={idx}>
                        <input
                            className="roles-check"
                            type="checkbox"
                            value={item.id}
                            onChange={(event) => {
                                let checked = event.target.checked;
                                setRoles(
                                    roles.map((data) => {
                                        if (item.id === data.id) {
                                            data.select = checked;
                                        }
                                        return data;
                                    }),
                                );
                            }}
                            checked={item.select}
                        />
                        <label>{item.name}</label>
                    </div>
                ))}
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
