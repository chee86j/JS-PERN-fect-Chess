# JS-PERN-fect-Chess

This is a real-time multiplayer chess game that allows two players to compete using React, Node.js, Socket.IO, and the chess.js library. The game updates moves in real time and includes a countdown timer for each player.

## Features

- **Real-Time Gameplay**: Moves are updated live, allowing players to see changes immediately.
- **Game Rules Management**: Uses chess.js to manage the rules and status of the game, including validations for moves and conditions like checkmate or stalemate.
- **Communication**: Real-time communication between the clients and server is facilitated by Socket.IO.
- **Player Timers**: Each player has a 5-minute timer that counts down during their turn.

## Technologies

- **React**: Used to build the user interface.
- **Node.js**: Serves as the server-side environment.
- **Socket.IO**: Manages real-time web socket connections.
- **Chess.js**: Handles the logic and state of the chess game.
- **Chessboardjsx**: Renders the chessboard in the user interface based on FEN strings.

## Setup

Follow these instructions to get a version of the project running on your local machine for development and testing.

### Requirements

- Node.js
- npm

### Installation

Follow these steps to get your development environment running:

1. Clone the repository
2. Install dependencies in the root directory and the client directory:
   `npm install`
3. Start the server:
   `node server.js`
4. Start the client:
   `npm start`
5. Open your browser and navigate to `http://localhost:3000/` to start playing chess!
