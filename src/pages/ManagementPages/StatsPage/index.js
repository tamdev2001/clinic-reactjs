import React from 'react';
import StatsReceiptExamination from './StatsReceiptExamination';
import { StatsReceiptPrescription } from './StatsReceiptPrescription';

export const DashboardStats = () => {
    return (
        <div style={{ height: '400px', width: '80em' }}>
            <StatsReceiptExamination></StatsReceiptExamination>
            <br />
            <br />
            <br />
            <br />
            <StatsReceiptPrescription></StatsReceiptPrescription>
        </div>
    );
};
