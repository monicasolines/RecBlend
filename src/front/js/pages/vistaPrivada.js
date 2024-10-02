import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/vistaPrivada.css"; 

// Tic-Tac-Toe Component
const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);

    const handleClick = (index) => {
        if (board[index] || calculateWinner(board)) return;
        const newBoard = board.slice();
        newBoard[index] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const winner = calculateWinner(board);
    const status = winner ? `Ganador: ${winner}` : `Siguiente jugador: ${isXNext ? 'X' : 'O'}`;

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
    };

    return (
        <div className="tic-tac-toe">
            <div className="status">{status}</div>
            <div className="board">
                {board.map((value, index) => (
                    <button key={index} className="square" onClick={() => handleClick(index)}>
                        {value}
                    </button>
                ))}
            </div>
            <button className="reset-btn" onClick={resetGame}>Reiniciar Juego</button>
        </div>
    );
};

// VistaPrivada Component
const VistaPrivada = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    return (
        <div className="mainPage1">
            {/* Incluyendo el juego Tic-Tac-Toe */}
            <TicTacToe />
        </div>
    );
};

export default VistaPrivada;
