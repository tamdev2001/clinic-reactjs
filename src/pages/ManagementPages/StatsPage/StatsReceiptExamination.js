import { ResponsiveBar } from '@nivo/bar';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import adminService from '~/services/admin.service';

const StatsReceiptExamination = () => {
    const [totalRe, setTotalRe] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());
    useEffect(() => {
        adminService.getStatsRevenueReMonthByYear(year).then((res) => {
            setTotalRe(res.data.data);
        });
    }, [year]);

    return (
        <div style={{ height: '70%', width: '100%' }}>
            <div>
                <label htmlFor="input-year">Nhập năm:</label>
                <input
                    type="number"
                    onChange={(e) => setYear(e.target.value === '' ? new Date().getFullYear() : e.target.value)}
                />
            </div>
            <h1>Thống kê tổng doanh thu phiếu khám năm {year}</h1>
            <ResponsiveBar
                data={totalRe}
                keys={[1]}
                indexBy={[0]}
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.4}
                valueScale={{ type: 'linear' }}
                colors="#3182CE"
                animate={true}
                enableLabel={true}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Tháng',
                    legendPosition: 'middle',
                    legendOffset: 32,
                }}
                axisTop={null}
                axisRight={null}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legendPosition: 'middle',
                    legendOffset: -40,
                }}
            />
        </div>
    );
};

export default StatsReceiptExamination;
