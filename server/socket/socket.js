const { v4: uuidV4 } = require("uuid");
//const { Schema, model } = require("mongoose");
const {  GameState } = require("../model");
const {createRoom,updateGameState,removeRoom} = require('../controller')

function handleSocketEvents(io, socket) {
  socket.on("createRoom", async (callback) => {
    // callback here refers to the callback function from the client passed as data
    const roomId = uuidV4(); // <- 1 create a new uuid
    console.log(` Room with ${roomId} created `);
    await createRoom(roomId);
    callback(roomId); // <- 4 respond with roomId to client by calling the callback function from the client
  });

  socket.on("move", async (data) => {
    // emit to all sockets in the room except the emitting socket.
    //console.log(data);
    socket.to(data.room).emit("move", data.move);
    const updatedData = await updateGameState(data);
  });

  socket.on("gameOver", async (data) => {
    // emit to all sockets in the room except the emitting socket.
    //console.log("socket "+JSON.stringify(data));
    await removeRoom(data.roomId);
  });
}



module.exports = {
  handleSocketEvents,
};
