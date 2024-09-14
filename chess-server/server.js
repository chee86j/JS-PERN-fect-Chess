const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const Chess = require('chess.js').Chess;
const authRoutes = require('./routes/authRoutes');
const sequelize = require('./models');

// Load environment variables from .env file
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: err.message || 'Internal Server Error' });
});

let chess = new Chess();

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('move', (moveData) => {
    const move = chess.move(moveData.move);
    if (move) {
      io.emit('move', { move: move.san });
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

console.log('Connecting to database:', process.env.DATABASE_URL);
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
