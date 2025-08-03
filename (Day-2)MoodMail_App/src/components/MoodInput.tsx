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
        placeholder='how are you feeling today?'
        value={mood}
        className='w-full p-5 text-md space-y-5 bg-gray-100 text-black'
        onChange={(e) => setMood(e.target.value)} // Replace with actual value
        disabled={disabled}/>

        <p className='text-gray-500 ps-6  rounded text-white text-md p-2'><b>Example: </b>"happy", "sad", "angry", "excited", "nervous"</p>
        {/* You can add more input fields here if needed */}
<Button className='w-full bg-green-500 text-white hover:bg-green-600'
        onClick={onGenerate} disabled={disabled}>Submit Mood</Button>
        <p className='text-gray-500 text-sm text-center'>Made with ❤️ by <i className='text-white'>Mohanprasath R</i></p>
    </div>
  )
}

export default MoodInput