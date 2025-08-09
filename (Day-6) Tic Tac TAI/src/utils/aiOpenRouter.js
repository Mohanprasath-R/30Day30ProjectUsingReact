export const getAiMove = async (board) => {
    const systemPrompt = `
    You are a smart Tic Tac Toe AI playing as "O".
    
    Your goal:
    1. Win if possible
    2. Block the opponent if they are about to win
    3. Otherwise: choose center > corner > side
    Only return ONE number (ef8). Do not explain.`;

    const userPrompt = `
    Current board: ${JSON.stringify(board)}

    Each cell is indexed like this:
    [0] [1] [2]
    [3] [4] [5]
    [6] [7] [8]

    "0" = you (AI)
    "X" = human
    null = empty

    What is your move?`;

    const getMoveFromClaude = async () => {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer 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`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'deepseek/deepseek-r1',
                temperature: 0.2,
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ]
            })
        });
        console.log(response);

        const data = await response.json();
        console.log(data);
        let text = data.choices?.[0]?.message?.content?.trim();
        console.log(text);

        const match = text?.match(/^\d+$/);
        return match ? parseInt(match[0], 10) : null;
    };

    try {
        const move = await getMoveFromClaude();
        return move;
    } catch (error) {
        console.error('Error parsing AI response:', error);

        const preferredOrder = [4, 0, 2, 6, 8, 1, 3, 5, 7];
        return preferredOrder.find(index => board[index] === null) ?? null;
    }
};
