import React from 'react'

const ScoreBoard = ({score}) => {   
  return (
    <div className='flex w-[300px] mb-4 justify-between text-lg font-semibold'>
        <div className='text-[#38BDF8]'>You (X) :{score.X} </div> 
        <div className='text-[#F472B6]'>AI (O) :{score.O} </div> 
    </div>
  )
}

export default ScoreBoard
