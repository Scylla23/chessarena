import axios from "axios";
import { useLoaderData } from "react-router-dom";
import Room from "../../components/Room/Room";

const AllGames = () => {
  const data = useLoaderData(); //data from the api call

  return ( 
    Array.isArray(data) ? (
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {data.map((room) => (
          <Room key={room.roomId} room={room} />
        ))}
      </div>
    ) : (
      <>No Active Games Found</>
    )
  );
};

export default AllGames;

export const GameStateLoader = async () => {
  let res = await axios.get("https://chessarena.onrender.com/api/gamestates");
  return res.data;
};
