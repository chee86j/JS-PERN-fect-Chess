import { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

function ChessBoard() {
    useEffect(() => {
        socket.on('move', move => {
        });

        return () => socket.off('move');
    }, []);

    const handleMove = (move) => {
        socket.emit('move', move);
        // Handle Moves updates
    };

    return (
        <div>
            {/* Chessboard component */}
        </div>
    );
}

export default ChessBoard;
