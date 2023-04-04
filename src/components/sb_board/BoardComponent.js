import React from "react";
import CellComponent from "./CellComponent";

const BoardComponent = ({ board, setBoard, isMyBoard, canShoot, shoot }) => {
  const boardClasses = ["board"];

  function addMark(x, y) {
    if (canShoot && !isMyBoard && board.cells[y][x].mark === null) {
      shoot(x, y);
      updateBoard();
    }
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  if (canShoot) {
    boardClasses.push(" shadow-lg shadow-cyan-500/50");
  }

  return (
    <>
      <div className={boardClasses.join("")}>
        {board.cells.map((row, index) => (
          <React.Fragment key={index}>
            {row.map((cell) => (
              <CellComponent key={cell.id} cell={cell} addMark={addMark} />
            ))}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default BoardComponent;
