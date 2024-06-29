import BaseGhost from "./baseGhost";
import Board from "../Board/board";

class Whimsical extends BaseGhost {
    constructor(board: Board) {
        super(board)
        this.xPos = 570
        this.yPos = 370
        this.color = "blue"
        this.tile = [((this.yPos - 210) / 20), ((this.xPos - 210) / 20)]
        let y1 = board.boardMatrix.length-2
        let y2 = board.boardMatrix.length - 2
        let x1 = board.boardMatrix[y1].length -2
        let x2 = board.boardMatrix[y1].length -10
        this.home = [board.boardMatrix[y1][x1], board.boardMatrix[y2][x2]]
        this.homeTarget = board.boardMatrix[y1][x1]
        this.name = "Inky"
    }
}

export default Whimsical