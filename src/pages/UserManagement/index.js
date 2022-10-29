import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import List from './List';
import Add from './Add';
import Edit from './Edit';

import { employeesData } from '../../data';
import adminService from '~/services/admin.service';

function DashboardContent() {
    const [employees, setEmployees] = useState(employeesData);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        adminService.getAllUser().then(
            (res) => setUsers(res.data),
            (error) => setUsers(error.response.status),
        );
    }, []);

    const handleEdit = (id) => {
        const [employee] = employees.filter((employee) => employee.id === id);

        setSelectedEmployee(employee);
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
                const [employee] = employees.filter((employee) => employee.id === id);

                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: `${employee.firstName} ${employee.lastName}'s data has been deleted.`,
                    showConfirmButton: false,
                    timer: 1500,
                });

                setEmployees(employees.filter((employee) => employee.id !== id));
            }
        });
    };

    return (
        <div className="container">
            {/* List */}
            {!isAdding && !isEditing && (
                <>
                    <Header setIsAdding={setIsAdding} nameBoard="Em" />
                    <List employees={users} handleEdit={handleEdit} handleDelete={handleDelete} nameBoard />
                </>
            )}
            {/* Add */}
            {isAdding && <Add employees={employees} setEmployees={setEmployees} setIsAdding={setIsAdding} nameBoard />}
            {/* Edit */}
            {isEditing && (
                <Edit
                    employees={employees}
                    selectedEmployee={selectedEmployee}
                    setEmployees={setEmployees}
                    setIsEditing={setIsEditing}
                    nameBoard
                />
            )}
        </div>
    );
}

export default DashboardContent;
