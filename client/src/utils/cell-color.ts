/**
  Determines whether a square/cell should be labeled as light based on its position and index.
 */
  export const isLightSquare = (position: string, index: number) => {
    // Extract the row from the position (e.g., from "a1" or "e4").
    const row = Number(position[1]);
  
    const isEven = (x: number) => !(x % 2);
  
    // Check if either the row or index(ICell[]) indicates that the square should be light.
    if (isEven(row) && !isEven(index + 1)) {
      return true;
    }
  
    if (isEven(index + 1) && !isEven(row)) {
      return true;
    }
  
    // If none of the conditions above are met, the square should not be light.
    return false;
  };