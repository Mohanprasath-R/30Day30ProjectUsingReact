import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend);
interface Props {
    data: { activity: string, hours: number }[]
}
const TimeChart = ({ data }: Props) => {
    const chartData = {
        labels: data.map(item => item.activity),
        datasets: [
            {
                label: 'Hours',
                data: data.map((d) => d.hours),
                backgroundColor: [
                    '#ff6384',
                    '#36a2eb',
                    '#ffce56',
                    '#4bc0c0',
                    '#9966ff',
                    '#ff9f40',
                ],
                borderWidth: 1,
            },
        ],
    }
    return (
            <Pie data={chartData} />
    )
}

export default TimeChart