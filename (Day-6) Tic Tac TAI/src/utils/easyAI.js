// Easy mode AI - Random moves with basic blocking

export const getEasyMove = (board) => {
    // First, check if AI can win
    const winningMove = findWinningMove(board, 'O');
    if (winningMove !== null) return winningMove;

    // Second, check if we need to block opponent
    const blockingMove = findWinningMove(board, 'X');
    if (blockingMove !== null) return blockingMove;

    // Third, prefer center, then corners, then sides
    const preferredOrder = [4, 0, 2, 6, 8, 1, 3, 5, 7];
    const availableMoves = preferredOrder.filter(index => board[index] === null);
    
    if (availableMoves.length === 0) return null;
    
    // Random selection from available moves (but weighted towards preferred positions)
    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    return availableMoves[randomIndex];
};

const findWinningMove = (board, player) => {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]  // diagonals
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        
        // Check if player has 2 in a row and can win
        if (board[a] === player && board[b] === player && board[c] === null) return c;
        if (board[a] === player && board[c] === player && board[b] === null) return b;
        if (board[b] === player && board[c] === player && board[a] === null) return a;
    }
    
    return null;
};
