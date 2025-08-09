import React, { useEffect, useState } from 'react'
import ScoreBoard from './components/ScoreBoard';
import GameBoard from './components/GameBoard';
import { getAIMove } from './utils/aiService';
import { checkWinner } from './utils/winner';
const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState({ X: 0, O: 0 });
  const [difficulty] = useState('easy');
  const [aiType] = useState('claude'); // Change to 'minimax' or 'gemini' as needed

  const handleClick = (index) => {
    if (!isPlayerTurn || board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsPlayerTurn(false);
  }

  useEffect(() => {
    const result = checkWinner(board);
    if (result?.winner) {
      setWinner(result.winner);
      if (result.winner !== 'Draw') {
        setScore(prevScore => ({
          ...prevScore,
          [result.winner]: prevScore[result.winner] + 1
        }));
      }
      return;
    }
    setWinner(null);
  }, [board]);
  useEffect(() => {
    if (!isPlayerTurn && !winner) {
      const aiTurn = async () => {
        const move = await getAIMove(board, difficulty, aiType);

        if (move !== null && board[move] === null) {
          const newBoard = [...board];
          newBoard[move] = 'O';
          setBoard(newBoard);
          setIsPlayerTurn(true);
        }
      }

      const timeoutId = setTimeout(aiTurn, 600);
      return () => clearTimeout(timeoutId);
    }
  }, [board, isPlayerTurn, winner, difficulty, aiType]);

  return (
    <div className='min-h-screen bg-[#0F172A] text-white flex flex-col items-center justify-center'>
      <h1 className='text-3xl font-bold mb-4'>TIC TAX TAI 🤖</h1>
      <ScoreBoard score={score} />
      <GameBoard board={board} handleClick={handleClick} />
      {winner && (
        <div className=' flex flex-col gap-3 mt-4 text-2xl font-semibold'>
          {winner === 'Draw' ? "It's a Draw!" : ` ${winner} Wins!`}
          <button
            className='mt-4 px-4 py-2 bg-[#38BDF8] text-white rounded hover:bg-[#0EA5E9]'
            onClick={() => {
              setBoard(Array(9).fill(null));
              setIsPlayerTurn(true);
              setWinner(null);
            }}>
            Play Again
          </button>
        </div>
      )}
    </div>
  )
}

export default App