import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

interface Props {
  data: { activity: string, hours: number, color: string }[]
}

const TimeChart = ({ data }: Props) => {
  const chartData = {
    labels: data.map(item => item.activity),
    datasets: [
      {
        label: 'Hours',
        data: data.map(d => d.hours),
        backgroundColor: data.map(d => d.color),
        borderWidth: 1,
      },
    ],
  }

  return <Pie data={chartData} />
}

export default TimeChart
