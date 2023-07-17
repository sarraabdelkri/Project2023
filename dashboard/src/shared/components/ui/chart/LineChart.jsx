import { useState } from "react";
import {
    LineChart,
    Line,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

const Chart = () => {
    const data = [
        { name: "Page A", frontend: 400, ai: 350, backend: 120 },
        { name: "Page B", frontend: 300, ai: 203, backend: 78 },
        { name: "Page C", frontend: 300, ai: 400, backend: 150 },
        { name: "Page D", frontend: 200, ai: 170, backend: 240 },
        { name: "Page E", frontend: 278, ai: 220, backend: 230 },
        { name: "Page F", frontend: 189, ai: 88, backend: 300 },
    ];

    const RandomizeData = () => {
        const newData = data.map((item) => {
            item.uv = Math.floor(Math.random() * 4000);
            return item;
        });
        setChartData(newData);
    };

    const [chartData, setChartData] = useState(data);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
                <Line
                    type="monotone"
                    dataKey="frontend"
                    stroke="#a855f7"
                    strokeWidth={5}
                />
                <Line
                    type="monotone"
                    dataKey="ai"
                    stroke="#ff5858"
                    strokeWidth={5}
                />
                <Line
                    type="monotone"
                    dataKey="backend"
                    stroke="#10b981"
                    strokeWidth={5}
                />
                <Tooltip />
                <Legend iconType="cricle" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default Chart;
