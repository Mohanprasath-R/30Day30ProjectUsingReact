import { findBestMove } from './minimax.js';
import { getEasyMove } from './easyAI.js';
import { getClaudeMove } from './aiClaude.js';
import { getGeminiMove } from './aiGemini.js';

export const getAIMove = async (board, difficulty = 'hard', aiType = 'minimax') => {
    switch (difficulty) {
        case 'easy':
            return getEasyMove(board);
        
        case 'hard':
            if (aiType === 'minimax') {
                return findBestMove(board);
            } else if (aiType === 'claude') {
                return await getClaudeMove(board);
            } else if (aiType === 'gemini') {
                return await getGeminiMove(board);
            } else {
                return findBestMove(board); // Default to minimax
            }
        
        default:
            return findBestMove(board);
    }
};

export const DIFFICULTY_LEVELS = {
    EASY: 'easy',
    HARD: 'hard'
};

export const AI_TYPES = {
    MINIMAX: 'minimax',
    CLAUDE: 'claude',
    GEMINI: 'gemini'
};
