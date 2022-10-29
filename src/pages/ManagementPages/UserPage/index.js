import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import List from './List';
import Add from './Add';
import Edit from './Edit';
import adminService from '~/services/admin.service';

function DashboardUser({ nameBoard }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [users, setUsers] = useState([]);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        adminService.getUsers().then(
            (res) => setUsers(res.data),
            (error) => setUsers(error.response.status),
        );
    }, [counter, isAdding, isEditing]);

    const handleEdit = (id) => {
        const [user] = users.filter((user) => user.id === id);

        setSelectedUser(user);
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then((result) => {
            if (result.value) {
                const [user] = users.filter((user) => user.id === id);

                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: `${user.username}'s data has been deleted.`,
                    showConfirmButton: false,
                    timer: 1500,
                });

                adminService.deleteUser(id).then(() => {
                    setCounter(counter + 1);
                });
            }
        });
    };

    return (
        <div className="container table-board" style={{ width: '100rem' }}>
            {/* List */}
            {!isAdding && !isEditing && (
                <>
                    <Header setIsAdding={setIsAdding} nameBoard={nameBoard} />
                    <List data={users} handleEdit={handleEdit} handleDelete={handleDelete} nameBoard={nameBoard} />
                </>
            )}
            {/* Add */}
            {isAdding && <Add setIsAdding={setIsAdding} nameBoard={nameBoard} />}
            {/* Edit */}
            {isEditing && <Edit selected={selectedUser} setIsEditing={setIsEditing} nameBoard={nameBoard} />}
        </div>
    );
}

export default DashboardUser;
