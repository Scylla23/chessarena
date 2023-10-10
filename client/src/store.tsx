import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createBoard } from "./utils/create-board";
import { Chess, Square } from "chess.js";
import { ICell } from "./types";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import toast from "react-simple-toasts";
import { gameOver } from "./utils/game-over";
import { socket } from "./socket";

// Default FEN string
const FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
// const FEN = 'rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3'; // Checkmate
// const FEN = '4k3/4P3/4K3/8/8/8/8/8 b - - 0 78'; // Stalemate

// Instantiate `chess.js`
export let chess = new Chess(FEN);

export interface IGameState {
  room: string;
  board: ICell[];
  fen: string;
  possibleMoves?: string[];
  isCheck: boolean;
  isCheckMate: boolean;
  turn: string;
  selectedCell: string | null;
  isGameOver: boolean;
  status: string | boolean;
}

export interface IChessMove {
  from?: string;
  to: string;
  promotion?: string;
}

// Define an initial state
const initialState: IGameState = {
  room: "",
  fen: FEN,
  board: createBoard(chess.fen()),
  isCheck: chess.inCheck(),
  isCheckMate: chess.isCheckmate(),
  turn: chess.turn(),
  possibleMoves: [],
  selectedCell: null,
  isGameOver: chess.isGameOver(),
  status: gameOver(chess)[1],
};

// Function to remove the extra character returned by chess.js for suggested moves, eg 'na3'
const getPositions = (moves: string[]): string[] => {
  return moves.map((move) => {
    const n = move.length;
    return move.substring(n - 2);
  });
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setSelectedCell: (state, action: PayloadAction<string>) => {
      //console.log("[setSelectedCell]");
      const square: Square = action.payload as Square;

      state.selectedCell = action.payload;
      state.possibleMoves = getPositions(
        chess.moves({
          square: square,
        })
      );

      //console.log("[]selectedCell", state.selectedCell);
    },
    makeMove: (state, action: PayloadAction<IChessMove>) => {
      const from = action.payload.from || (state.selectedCell as string);
      const to = action.payload.to;

      //console.log("[makeMove] ::", from, to, action);

      try {
        chess.move({ from, to, promotion: "q" });

        // Check if game over
        const [ifOver, status] = gameOver(chess);

        if (ifOver) {
          state.status = status;
        }

        state.isCheck = chess.inCheck();
        state.isCheckMate = chess.isCheckmate();
        state.isGameOver = chess.isGameOver();

      } catch (e) {
        console.log("Error", e);
        // console.log("in check", chess.isCheck());
        // console.log("is check mate", chess.isCheckmate());
         toast('Invalid move!', { className: 'theme-toast' });
      }
      socket.emit("move", state);
      
      
      // Set the updated FEN string
      console.log(chess.fen());
      state.fen = chess.fen();
      state.board = createBoard(chess.fen());
      console.log("after move state " + JSON.stringify(state));
      state.possibleMoves = [];
      state.turn = chess.turn();
    },
    createRoom: (state, action: PayloadAction<string>) => {
      state.room = action.payload;
    },
    updateGameState: (state, action: PayloadAction<IGameState>) => {
      //console.log(action.payload);

      //console.log(chess.fen());
      chess = new Chess(action.payload.fen);
      state.fen = action.payload.fen;
      state.room = action.payload.room;
      state.board = createBoard(chess.fen());
      state.possibleMoves = action.payload.possibleMoves;
      state.isCheck = action.payload.isCheck;
      state.isCheckMate = action.payload.isCheckMate;
      state.turn = action.payload.turn;
      state.selectedCell = action.payload.selectedCell;
      state.isGameOver = action.payload.isGameOver;
      state.status = action.payload.status;
    },
  },
});

// Export actions
export const { makeMove, setSelectedCell, createRoom, updateGameState } =
  gameSlice.actions;

// Create the store
const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
  },
});

// Define root store type
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
