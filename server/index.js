const express = require("express");
const { Server } = require("socket.io");
const cors = require('cors');
const http = require("http");
const socketIo = require('socket.io');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config()
const { handleSocketEvents } = require('./socket/socket');
const gameState = require('./routes/gameState');

const app = express(); // initialize express
const server = http.createServer(app);
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;




app.get("/" , (req,res) => {
  res.send("<h1>Hello<h1/>");
})

app.use('/api', gameState);


server.listen(port, () => {
  console.log(`listening on *:${port}`);
});


// socketio.connection
const io = new Server(server, {
  cors: '*',
});

io.on('connection', (socket) => {
  console.log(socket.id, 'connected');
  handleSocketEvents(io, socket);
});

//mongodb connection
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "chess",
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });
