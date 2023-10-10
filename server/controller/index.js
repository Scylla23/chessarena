const {GameState} = require('../model')


const updateGameState = async (data) => {
  const roomId = data?.room;
  const currState = JSON.stringify(data);
  try {
    // Find and update the document with the matching roomId
    const updatedData = await GameState.findOneAndUpdate(
      { roomId },
      { $set: { currState } }, // Update the currState field
      { new: true } // Return the updated document
    );

    if (!updatedData) {
      // no document with the given roomId was found
      console.log(`No room found with roomId: ${roomId}`);
    }
    return updatedData; // Return the updated document
  } catch (err) {
    console.log("Error updating database:", err);
    //throw err;
  }
};

const createRoom = async (data) => {
  try {
    // Check if the requested roomId already exists
    let s =
      '{"room":"","board":[{"pos":"a8","piece":"r"},{"pos":"b8","piece":"n"},{"pos":"c8","piece":"b"},{"pos":"d8","piece":"q"},{"pos":"e8","piece":"k"},{"pos":"f8","piece":"b"},{"pos":"g8","piece":"n"},{"pos":"h8","piece":"r"},{"pos":"a7","piece":"p"},{"pos":"b7","piece":"p"},{"pos":"c7","piece":"p"},{"pos":"d7","piece":"p"},{"pos":"e7","piece":"p"},{"pos":"f7","piece":"p"},{"pos":"g7","piece":"p"},{"pos":"h7","piece":"p"},{"pos":"a6","piece":""},{"pos":"b6","piece":""},{"pos":"c6","piece":""},{"pos":"d6","piece":""},{"pos":"e6","piece":""},{"pos":"f6","piece":""},{"pos":"g6","piece":""},{"pos":"h6","piece":""},{"pos":"a5","piece":""},{"pos":"b5","piece":""},{"pos":"c5","piece":""},{"pos":"d5","piece":""},{"pos":"e5","piece":""},{"pos":"f5","piece":""},{"pos":"g5","piece":""},{"pos":"h5","piece":""},{"pos":"a4","piece":""},{"pos":"b4","piece":""},{"pos":"c4","piece":""},{"pos":"d4","piece":""},{"pos":"e4","piece":""},{"pos":"f4","piece":""},{"pos":"g4","piece":""},{"pos":"h4","piece":""},{"pos":"a3","piece":""},{"pos":"b3","piece":""},{"pos":"c3","piece":""},{"pos":"d3","piece":""},{"pos":"e3","piece":""},{"pos":"f3","piece":""},{"pos":"g3","piece":""},{"pos":"h3","piece":""},{"pos":"a2","piece":"P"},{"pos":"b2","piece":"P"},{"pos":"c2","piece":"P"},{"pos":"d2","piece":"P"},{"pos":"e2","piece":"P"},{"pos":"f2","piece":"P"},{"pos":"g2","piece":"P"},{"pos":"h2","piece":"P"},{"pos":"a1","piece":"R"},{"pos":"b1","piece":"N"},{"pos":"c1","piece":"B"},{"pos":"d1","piece":"Q"},{"pos":"e1","piece":"K"},{"pos":"f1","piece":"B"},{"pos":"g1","piece":"N"},{"pos":"h1","piece":"R"}],"isCheck":false,"isCheckMate":false,"turn":"w","possibleMoves":[],"selectedCell":null,"isGameOver":false,"status":""}';
    let currState = JSON.parse(s);
    currState.room = data;
    currState = JSON.stringify(currState);
    //console.log(data);
    // const existingRoom = await GameState.findOne({ roomId: data });

    // if (existingRoom) {
    //   throw new Error(`Room with roomId ${data} already exists`);
    // }

    const newState = new GameState({ roomId: data, currState: currState });

    // // Save the new room to the database
    await newState.save();

    // return savedRoom;
  } catch (err) {
    console.log("Error creating room:", err);
    throw err;
  }
};

const removeRoom = async (data) => {
  try {
    console.log("Controller removeRoom " + data);
    await GameState.findOneAndRemove({ roomId: data });

    //console.log(`Removed ${data} from db`);
  } catch (error) {
    console.error("Error deleting document:", error);
  }
};

module.exports= {createRoom,updateGameState,removeRoom}