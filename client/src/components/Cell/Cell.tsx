import './Cell.css';
import { ICell } from '../../types';
import { isLightSquare } from '../../utils';
import {Piece} from '../';
import { useDispatch } from 'react-redux';
import { makeMove, useAppSelector } from '../../store';

interface CellProps {
    cell: ICell;
    index: number;
}

const Cell: React.FC<React.PropsWithChildren<CellProps>> = ({ cell, index }) => {

    const {possibleMoves, turn, isCheck, selectedCell} = useAppSelector(state => state.game);
    const dispatch = useDispatch();

      // Check if the cell represents a light-colored square on the board
    const isLightBlock = isLightSquare(cell.pos, index);

    // Check if the cell's position is in the list of possible moves
    const isPossibleMove = possibleMoves !== undefined && possibleMoves.includes(cell.pos);
    
    // Determine the  color if Uppercase then its W and B otherwise
    const color = cell.piece.toUpperCase() === cell.piece ? 'w' : 'b';

      // Check if the cell contains a king that is in check
    const inCheck = () => {
        const king = cell.piece.toUpperCase() === 'K';
        return turn === color && king && isCheck;
    };

    const handleDrop = () => {
        
        dispatch(makeMove({ from: selectedCell as string, to: cell.pos }));
    };

    return (
        <div
            className={`cell ${isLightBlock ? 'light' : 'dark'} ${isPossibleMove && 'highlight'} ${inCheck() && 'check'}`}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
        >
            <Piece name={cell.piece} pos={cell.pos} />
            
        </div>
    );
};

export default Cell;