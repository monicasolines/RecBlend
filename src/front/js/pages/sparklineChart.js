import React from 'react';
import { LineChart, Line } from 'recharts';

export const SparklineChart = ({ data }) => {
    const chartData = data.map((price, index) => ({ index, price }));

    return (
        <LineChart width={100} height={30} data={chartData}>
            <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} dot={false} />
        </LineChart>
    );
};