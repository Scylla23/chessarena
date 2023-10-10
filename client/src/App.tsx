import { Route, RouterProvider, createBrowserRouter , createRoutesFromElements  } from "react-router-dom";
import './App.css';
import Game from './pages/Game/Game';
import Layout from "./Layout";
import AllGames, { GameStateLoader } from "./pages/ActiveGames/ActiveGames";

const App: React.FC = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout/>}>

        <Route path="" element={<Game/>} />
        <Route path="game/*" element={<Game />} />
        <Route 
          loader={GameStateLoader}           
          path="games" element={<AllGames/>} />

      </Route>
    )
  )

  return <RouterProvider router={router} />;
};

export default App;
