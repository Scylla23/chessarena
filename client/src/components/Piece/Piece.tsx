import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedCell } from '../../store';

interface PieceProps {
  name: string;
  pos: string;
}

const Piece: React.FC<React.PropsWithChildren<PieceProps>> = ({
  name,
  pos
}) => {
  const dispatch = useDispatch();
  const piece = useRef<HTMLImageElement>(null);

      // Determine the  color if Uppercase then its W and B otherwise
  const color = name === name.toUpperCase() ? 'w' : 'b';

  const imageName = color + name.toUpperCase(); //bN -> black Knight wP -> white pawn

  const fallback = () => `/assets/images/empty.png`;   //empty image

    // Handle the drag start event when a piece is being dragged
  const handleDragStart = async () => {
    try {
      dispatch(setSelectedCell(pos));
      
      // Hide the piece's image when dragged
      setTimeout(() => {
        if (piece.current) piece.current.style.display = 'none';
      }, 0);
    } catch (error) {
      console.error(error);
    }
  };

    // Handle the drag end event when a piece is no longer being dragged
  const handleDragEnd = () => {
    // Show the piece's image
    if (piece.current) piece.current.style.display = 'block';
  };

  return (
    <img
      src={`/assets/images/${imageName}.png`}
      className="piece"
      alt=""
      onError={fallback}
      draggable={true}
      ref={piece}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    />
  );
};

export default Piece;
