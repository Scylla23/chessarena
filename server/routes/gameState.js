const express = require('express');
const router = express.Router();
const {GameState} = require('../model/index');

// Define a route to retrieve all data from the database
router.get('/gamestates', async (req, res) => {
  try {
    //console.log(GameState);
    const gameStates = await GameState.find(); // Retrieve all documents from the GameState collection
    res.json(gameStates); // Send the retrieved data as JSON response
  } catch (err) {
    console.error('Error retrieving game states:', err);
    res.status(500).json({ message: err });
  }
});

router.get('/gamestate/:roomId', async (req, res) => {
  try {
    const { roomId } = req.params; // Extract the roomId from the request parameters
    //console.log(roomId);
    // Find the game state with the specified roomId
    const gameState = await GameState.findOne({ roomId });

    if (!gameState) {
      // If no game state is found for the specified roomId, return a 404 response
      return res.status(404).json({ message: 'Game state not found for roomId: ' + roomId });
    }

    // Send the retrieved game state as a JSON response
    res.json(gameState);
  } catch (err) {
    console.error('Error retrieving game state:', err);
    res.status(500).json({ message: err });
  }
});



module.exports = router;
