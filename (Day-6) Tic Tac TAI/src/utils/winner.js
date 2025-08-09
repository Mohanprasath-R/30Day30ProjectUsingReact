export const checkWinner = (board) => {
    const winningCombinations = [
        [0, 1, 2], // Row 1
        [3, 4, 5], // Row 2
        [6, 7, 8], // Row 3

        [0, 3, 6], // Column 1
        [1, 4, 7], // Column 2
        [2, 5, 8], // Column 3

        [0, 4, 8], // Diagonal \
        [2, 4, 6]  // Diagonal /
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return {winner : board[a] , combination}; // Return the winner ('X' or 'O')
        }
    }
    if (board.every(cell => cell !== null)) {
        return {winner: 'Draw', combination: []}; // Return 'Draw' if all cells are filled
    }
    return null; // No winner yet
}