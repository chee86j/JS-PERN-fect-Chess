import { useEffect, useState } from "react";
import io from "socket.io-client";
import Chess from "chess.js"; // chess.js library for chess logic based on FEN
import Chessboard from "chessboardjsx"; // chessboardjsx library for chessboard UI

const socket = io("http://localhost:4000");
const chess = new Chess(); // initialize a new chess game

function ChessBoard() {
  const [fen, setFen] = useState(chess.fen()); // state to store the FEN string
  const [orientation, setOrientation] = useState("white"); // board orientation
  const [whiteTime, setWhiteTime] = useState(300); // 5 minutes in seconds
  const [blackTime, setBlackTime] = useState(300);
  const [currentTurn, setCurrentTurn] = useState("white");

  useEffect(() => {
    const timer = setInterval(() => {
      if (chess.game_over()) {
        clearInterval(timer);
      } else {
        if (chess.turn() === "w") {
          setWhiteTime((time) => (time > 0 ? time - 1 : 0));
        } else {
          setBlackTime((time) => (time > 0 ? time - 1 : 0));
        }
      }
    }, 1000);

    socket.on("move", (moveData) => {
      chess.move(moveData.move); // make the move in the chess game
      setFen(chess.fen()); // Update the FEN string
      setCurrentTurn(chess.turn() === "w" ? "white" : "black"); // Update the current turn
    });

    return () => {
      clearInterval(timer);
      socket.off("move");
    };
  }, []);

  const handleMove = (sourceSquare, targetSquare) => {
    // Create a move object for chess.js
    const move = chess.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen (for example)
    });

    // validate the move and update the board
    if (!move) return false; // move is invalid

    setFen(chess.fen()); // Update the FEN string
    socket.emit("move", { move: move.san }); // Send the move to the opponent
    setCurrentTurn(chess.turn() === "w" ? "white" : "black"); // Update the current turn
    return true; // move made successfully
  };

  return (
    <div>
      {/* Chessboard component based on the FEN string */}
      <Chessboard
        position={fen}
        onDrop={({ sourceSquare, targetSquare }) =>
          handleMove(sourceSquare, targetSquare)
        }
        orientation={orientation}
        draggable={true}
      />
      <p>White Time: {whiteTime}s</p>
      <p>Black Time: {blackTime}s</p>
    </div>
  );
}

export default ChessBoard;

/* 
FEN (Forsyth-Edwards Notation) is a standard method for describing a chessboard position. 
It's a compact string representation that includes information about:

-Piece placement: The location of each piece on the board.
-Active color: Which side is to move next (white or black).
-Castling availability: Whether either king can castle.
-En passant availability: Whether an en passant capture is possible.
-Half-move clock: The number of moves since the last capture or pawn move.
-Full-move number: The number of full moves since the start of the game.

chess.js library provides a Chess class that can be used to manage a chess game, 
including making moves, validating moves, and generating FEN strings.
for example a FEN string looks like this: 
"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
which represents the starting position of a chess game.

r- rook, n- knight, b- bishop, q- queen, k- king, p- pawn
uppercase letters represent white pieces and lowercase represent black pieces
*/
