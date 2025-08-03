import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface Props{
    onAdd: (activity:string, hours:number) => void
}
const TimeForm = ({ onAdd }:Props) => {
    
    const [activity , setActicity]=useState("");
    const [hours , setHours]=useState("");


    function handleSubmit() {
        if (activity.trim() && hours) {
            // Both fields are filled, so call onAdd
            onAdd(activity, Number(hours));
            
            // Clear the form
            setActicity("");
            setHours("");
        } else {
            // Show error if fields are not filled
            alert("Please fill both fields");
        }
    }

return (
    <div className='space-y-3'>

        <Input
        placeholder='Activity (e.g Sleep)'
        value={activity}
        onChange={(e) => setActicity(e.target.value)}
        />
        <Input
        placeholder='Hours (e.g 8)'
        value={hours}
        onChange={(e) => setHours(e.target.value)}
        />
        <Button className='w-full' onClick={handleSubmit}>
            Add Activity
        </Button>
    </div>
  )
} 

export default TimeForm