
# ChessArena
This is a React chess application that can be used to play chess online. It is built using React.js, TypeScript, Node.js, Express.js, MongoDB and Socket.io.

![demo](./client/demo-2.png?raw=true)

## Technology Used
- ReactJs for creating components and hooks like useLoaderData() for performance optimisation.
- It uses chess.js to manage the core logic of chess i.e. move generation/validation and and check/checkmate/stalemate detection
- The chess board is being built using custom utility function using Forsyth–Edwards Notation (FEN).
- Redux is used to manage state such as 'isCheck, isCheckMate, turn, isGameOver' etc.
- React Router DOM for dynamic routing
- Sockets are used for events based communication between client and server
- MongoDB for storing and retrieving data.

## Features
- Valid move highlighting
- Continue playing any previous active game

## How to play
- Click Start 
- Play
- Go to Active Games if you want to continue any previous games.
- You can any time Reset and Start a new Game
- You can play without pressing Start but the progress will not be saved then

## Setup Locally
### Client
1. Install the dependencies:
`npm install`

2. Start the development server:
`npm run dev`

The application will be available at http://localhost:5173/.

### Server
1. Install the dependencies:
`npm install`

2. Start the development server:
`npm start`

The server will be live at http://localhost:3000/.

