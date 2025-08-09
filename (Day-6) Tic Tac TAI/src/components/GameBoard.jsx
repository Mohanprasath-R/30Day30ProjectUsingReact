import React from 'react'
import Square from './Square';

const GameBoard = ({board , handleClick}) => {
  return (
    <div className='grid grid-cols-3 gap-2 w-[300px] h-[300px]'>
      {board.map((value, index) => (
          <Square key={index} value={value} index={index}
           onClick={() => handleClick(index)} />
        ))}
    </div>
  )
}

export default GameBoard