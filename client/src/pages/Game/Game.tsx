import { useEffect } from "react";
import {Board , GameOver} from "../../components";
import { socket } from "../../socket";
import {
  createRoom,
  updateGameState,
  useAppSelector,
} from "../../store";
import "./Game.css";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

const Game = () => {
  socket.connect();

  const {isGameOver , room , turn , board} = useAppSelector((state) => state.game);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const roomId = urlSearchParams.get("roomId");
     //console.log(roomId);
     
      if (roomId != null) {
        try {
          const response = await axios.get(`https://chessarena.onrender.com/api/gamestate/${roomId}`);
          
          const gameStateData = JSON.parse(response.data.currState);
            //console.log(gameStateData);
            
          // Dispatch an action to update the game state with the state of the roomId
          dispatch(updateGameState(gameStateData));
          
        } catch (error) {
          console.error(`Error fetching game gamestate from db: ${error}`);
        }
      }
    }

    fetchData();
  }, []);

  if (isGameOver) {
    const roomId = room;
    socket.emit("gameOver", {roomId}); //close the room 
    return <GameOver />;
  }

  return (
    <div className="game-wrapper">
      <div className="statusBar">
        <div
          className={`turnIndicator ${
              turn === "w" ? "t-white" : "t-black"
          }`}
        >
          Turn: <span>{turn === "w" ? "White" : "Black"}</span>
          RoomId: <span>{room}</span>
        </div>
      </div>
      <div>
        <div className="game">
          <ul className="board-info board-left">
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>7</li>
            <li>8</li>
          </ul>
          <ul className="board-info board-top">
            <li>a</li>
            <li>b</li>
            <li>c</li>
            <li>d</li>
            <li>e</li>
            <li>f</li>
            <li>g</li>
            <li>h</li>
          </ul>
          <Board cells={board} />
        </div>
        <button
          className="btn"
          onClick={() => {
            socket.emit("createRoom", (r: string) => {
              console.log(r);
              dispatch(createRoom(r));
            });
          }}
        >
          Start
        </button>
        <Link to="/">
        <button
          className="btn"
          onClick={() => {
            window.location.href = window.location.href
          }}
        >
          Reset
        </button>
        </Link>
      </div>
    </div>
  );
};

export default Game;
