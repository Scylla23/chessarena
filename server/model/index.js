const { Schema, model } = require("mongoose") ;
 

const roomSchema = new Schema({
  roomId: {
    type: String,
    required: true,
    unique: true,
  }
});
const gameStateSchema = new Schema({
    roomId: {
        type: String,
        required: true,
        unique: true,
      },
    currState: {
    type: String,
    required: true,
  }
});

const Room = model('Room', roomSchema);
const GameState = model('GameState', gameStateSchema);
  
  module.exports = {
    Room,
    GameState
  }