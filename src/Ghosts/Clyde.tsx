import BaseGhost from "./baseGhost";
import Board from "../Board/board";


class Clyde extends BaseGhost {
    lost: boolean
    constructor(board: Board) {
        super(board)
        this.xPos = 550
        this.yPos = 330
        this.color = "orange"
        this.tile = [((this.yPos - 210) / 20), ((this.xPos - 210) / 20)]
        this.home = [board.boardMatrix[board.boardMatrix.length-2][1], board.boardMatrix[board.boardMatrix.length-6][6]]
        this.homeTarget = board.boardMatrix[1][54]
        this.name = "Clyde"
        this.lost = false
    }
}

export default Clyde