export const getGeminiMove = async (board) => {
    const systemPrompt = `
    You are a smart Tic Tac Toe AI playing as "O".
    
    Your goal:
    1. Win if possible
    2. Block the opponent if they are about to win
    3. Otherwise: choose center > corner > side
    Only return ONE number (0-8). Do not explain.`;

    const userPrompt = `
    Current board: ${JSON.stringify(board)}

    Each cell is indexed like this:
    [0] [1] [2]
    [3] [4] [5]
    [6] [7] [8]

    "O" = you (AI)
    "X" = human
    null = empty

    What is your move?`;

    const getMoveFromGemini = async () => {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'google/gemini-pro',
                temperature: 0.2,
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ]
            })
        });

        const data = await response.json();
        let text = data.choices?.[0]?.message?.content?.trim();
        
        const match = text?.match(/^\d+$/);
        return match ? parseInt(match[0], 10) : null;
    };

    try {
        const move = await getMoveFromGemini();
        return move;
    } catch (error) {
        console.error('Error parsing Gemini response:', error);
        
        // Fallback to basic strategy
        const preferredOrder = [4, 0, 2, 6, 8, 1, 3, 5, 7];
        return preferredOrder.find(index => board[index] === null) ?? null;
    }
};
