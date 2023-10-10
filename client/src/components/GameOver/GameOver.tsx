import { useAppSelector } from '../../store';
import './GameOver.css'

const GameOver: React.FC = () => {

    // Grab the `status` and `turn` from global state
    const { turn, status } = useAppSelector(state => state.game);

    // Determine winner
    let winner;

    if (status === "checkmate") {
        if (turn === 'w') {
            winner = 'black';
        } else {
            winner = 'white';
        }
    }

    const reloadPage = () => {
        window.location.href = '/'
    }


  return (
    <div className='container'>
            <h1>Game over</h1>
            <p>
                The game ended in a <mark>{status}</mark>
            </p>
            {winner && (
                <p>
                    <mark>{winner.toUpperCase()}</mark> Won
                </p>
            )}
                <button onClick={reloadPage} >Play Again</button>
            
            
        </div>
  );
};

export default GameOver;