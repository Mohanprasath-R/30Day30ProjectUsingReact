import TimeChart from '@/components/TimeChart'
import TimeForm from '@/components/TimeForm'
import { useEffect, useState } from 'react'

interface ActivityData {
  activity: string
  hours: number
  color: string
}

const Home = () => {
  const [data, setData] = useState<ActivityData[]>([])

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("timeData")
    if (saved) setData(JSON.parse(saved))
  }, [])

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem("timeData", JSON.stringify(data))
  }, [data])

  const handleAdd = (activity: string, hours: number, color: string) => {
    const total = data.reduce((sum, d) => sum + d.hours, 0) + hours
    if (total > 24) {
      alert("⚠️ Total hours exceed 24!")
    }
    setData(prev => [...prev, { activity, hours, color }])
  }

  const totalHours = data.reduce((sum, d) => sum + d.hours, 0)

  return (
    <div className='max-w-md mx-auto p-6 bg-white rounded-lg shadow space-y-6'>
      <h1 className="text-2xl font-bold">⏲ Time Tracker</h1>
      <p className={`font-semibold ${totalHours > 24 ? 'text-red-500' : 'text-green-600'}`}>
        Total Hours: {totalHours}
      </p>
      <TimeForm onAdd={handleAdd} />
      <TimeChart data={data} />
    </div>
  )
}

export default Home
