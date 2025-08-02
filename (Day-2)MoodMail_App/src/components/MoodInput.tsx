import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type Props = {
    mood: string,
    setMood: (val: string) => void,
    onGenerate: () => void,
    disabled: boolean
    }

const MoodInput = ({mood , setMood, onGenerate, disabled}: Props) => {
  return (
    <div className='space-y-4'>
        <Input 
        placeholder='how are you feeling today?(happy, sad, angry, excited, nervous)'
        value={mood}
        onChange={(e) => setMood(e.target.value)} // Replace with actual value
        disabled={disabled}/>
        <Button className='w-full'
        onClick={onGenerate} disabled={disabled}>Submit Mood</Button>
        {/* Add more input fields as needed */}
        {/* You can also include a MoodOutput component here to display the generated mood mail */}
    </div>
  )
}

export default MoodInput