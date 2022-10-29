import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import List from './List';
import Add from './Add';
import Edit from './Edit';
import adminService from '~/services/admin.service';

function DashboardCertificate({ nameBoard }) {
    const [selectedCertificate, setSelectedCertificate] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [certificates, setCertificates] = useState([]);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        adminService.getCertificates().then(
            (res) => setCertificates(res.data),
            (error) => setCertificates(error.response.status),
        );
    }, [counter, isAdding, isEditing]);

    const handleEdit = (id) => {
        const [certificate] = certificates.filter((certificate) => certificate.id === id);

        setSelectedCertificate(certificate);
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
                const [certificate] = certificates.filter((certificate) => certificate.id === id);

                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: `${certificate.name}'s data has been deleted.`,
                    showConfirmButton: false,
                    timer: 1500,
                });

                adminService.deleteCertificate(id).then(() => {
                    setCounter(counter + 1);
                });
            }
        });
    };

    return (
        <div className="container" style={{ width: '100rem' }}>
            {/* List */}
            {!isAdding && !isEditing && (
                <>
                    <Header setIsAdding={setIsAdding} nameBoard={nameBoard} />
                    <List
                        data={certificates}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        nameBoard={nameBoard}
                    />
                </>
            )}
            {/* Add */}
            {isAdding && <Add setIsAdding={setIsAdding} nameBoard={nameBoard} />}
            {/* Edit */}
            {isEditing && <Edit selected={selectedCertificate} setIsEditing={setIsEditing} nameBoard={nameBoard} />}
        </div>
    );
}

export default DashboardCertificate;
