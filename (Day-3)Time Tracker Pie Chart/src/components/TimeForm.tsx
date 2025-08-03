import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface Props {
  onAdd: (activity: string, hours: number, color: string) => void
}

const TimeForm = ({ onAdd }: Props) => {
  const [activity, setActivity] = useState("")
  const [hours, setHours] = useState("")
  const [color, setColor] = useState("#ff6384")

  function handleSubmit() {
    if (activity.trim() && hours) {
      onAdd(activity, Number(hours), color)
      setActivity("")
      setHours("")
      setColor("#ff6384")
    } else {
      alert("Please fill all fields")
    }
  }

  return (
    <div className='space-y-3'>
      <Input
        placeholder='Activity (e.g Sleep)'
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
      />
      <Input
        placeholder='Hours (e.g 8)'
        type='number'
        value={hours}
        onChange={(e) => setHours(e.target.value)}
      />
      <div>
        <label>Pick a color: </label>
        <Input type='color' value={color} onChange={(e) => setColor(e.target.value)} />
      </div>
      <Button className='w-full' onClick={handleSubmit}>
        Add Activity
      </Button>
    </div>
  )
}

export default TimeForm
