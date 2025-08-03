import TimeChart from '@/components/TimeChart';
import TimeForm from '@/components/TimeForm'
import { useState } from 'react';

const Home = () => {

    const [data, setdata] = useState<{activity:string; hours:number} [] > ([]);
    
    const handleAdd = (activity:string, hours:number) =>{
        setdata ((prev) => [...prev, {activity,hours}]);
    }

  return (
    <div className='max-w-md mx-auto p-6 bg-white rounded-lg shadow space-y-6 '>
        <h1 className="text-2xl font-bold ">⏲Time Traker</h1>
        <TimeForm onAdd={handleAdd} />
        <TimeChart data={data} />
    </div>
  )
}

export default Home;