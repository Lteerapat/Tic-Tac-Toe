import Square from "./Square";
import { useMemo } from 'react';

const Board = ({xIsNext, squares, onPlay}) => {
    
    const handleClick = (i) => {
        if (squares[i] || defineWinner(squares)) {
            return;
        }
        const nextSquares = [...squares];
        nextSquares[i] = xIsNext ? 'X':'O';
        onPlay(nextSquares);
    }

    const winner = useMemo(() => defineWinner(squares), [squares]);

    let status;
    if (winner) {
        status = `Winner: ${winner}`;
    } else {
        status = `Next player: ${xIsNext ? 'X':'O'}`;
    };

    const renderSquare = (i) => <Square value={squares[i]} onSquareClick={() => handleClick(i)} />;

    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </>
    );
};

const defineWinner = (squares) => {
    const winCondition = [
        [0,1,2],
        [3,4,5],
        [6,7,8], 
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    for (let i  = 0; i < winCondition.length; i++) {
        const [a, b, c] = winCondition[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default Board;