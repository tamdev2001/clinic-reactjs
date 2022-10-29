import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import List from './List';
import Add from './Add';
import Edit from './Edit';
import adminService from '~/services/admin.service';

function DashboardMedicine({ nameBoard }) {
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [medicines, setMedicines] = useState([]);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        adminService.getMedicines().then(
            (res) => setMedicines(res.data),
            (error) => setMedicines(error.response.status),
        );
    }, [counter, isAdding, isEditing]);

    const handleEdit = (id) => {
        const [medicine] = medicines.filter((medicine) => medicine.id === id);

        setSelectedMedicine(medicine);
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
                const [medicine] = medicines.filter((medicine) => medicine.id === id);

                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: `${medicine.name}'s data has been deleted.`,
                    showConfirmButton: false,
                    timer: 1500,
                });

                adminService.deleteMedicine(id).then(() => {
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
                    <List data={medicines} handleEdit={handleEdit} handleDelete={handleDelete} nameBoard={nameBoard} />
                </>
            )}
            {/* Add */}
            {isAdding && <Add setIsAdding={setIsAdding} nameBoard={nameBoard} />}
            {/* Edit */}
            {isEditing && <Edit selected={selectedMedicine} setIsEditing={setIsEditing} nameBoard={nameBoard} />}
        </div>
    );
}

export default DashboardMedicine;
