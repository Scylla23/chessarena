
import { ICell } from "../types";

class Cell implements ICell {

    pos: string;
    piece: string;

    constructor(pos: string, piece: string) {
        this.pos = pos;
        this.piece = piece;
    }
    //data serializer
    serialize() {
        return {
            pos: this.pos,
            piece: this.piece,
        };
    }
}
//  returns an array of range 1, n
const range = (n: number): number[] => {
    return Array.from({ length: n }, (_, i) => i + 1);
};

/**
 *
  fenString rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
  Piece Placement
  Active Color
  Castling Availability KQkq all castling rights are available
  En Passant Target Square
  Halfmove Clock
  Fullmove Number
 */
export const createBoard = (fenString: string): ICell[] => {
    
    const fen = fenString.split(' ')[0]; //Get the first portion

    const fenPieces = fen.split('/').join(''); //remove the row delimiters '/'
    //rnbqkbnrpppppppp8888PPPPPPPPRNBQKBNR

    let pieces: string[] = Array.from(fenPieces);

    //adding spaces Number times which represents the empty cells 
    let currentIndex = 0;
    for (let i = 0; i < pieces.length; i++) {
        const item = pieces[i];
        if (!isNaN(Number(item)) && isFinite(Number(item))) {
            const emptySquaresCount = Number(item);
            pieces.splice(i, 1); // Remove the number
            for (let j = 0; j < emptySquaresCount; j++) {
                pieces.splice(i + j, 0, ''); // Insert empty squares
            }
            currentIndex += emptySquaresCount - 1;
        }
    }

    // Flatten out the above built array to loop over and generate cells -> 1D
    pieces = pieces.flat();

    const rows = range(8)
        .map((n) => n.toString())
        .reverse(); //["8", "7", "6", "5", "4", "3", "2", "1"]  //start at top left so first will be a8 square

    const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    const cells: string[] = []; //[a1, b1, c1..., h8]
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        for (let j = 0; j < columns.length; j++) {
            const col = columns[j];
            cells.push(col + row); //e.g a1, b1, c1...
        }
    }

    // Build the board
    const board: ICell[] = [];
    for (let i = 0; i < cells.length; i++) {
        //'cells', and 'pieces' have the same length of 64
        const cell = cells[i];
        const piece = pieces[i];
        board.push(new Cell(cell, piece).serialize());
    }

    return board;
};

// console.log(
//     createBoard('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
// );