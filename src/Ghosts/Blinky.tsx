// Blinky is supposed to be the simplest of the ghosts to program
// reason being that he just always follows the player
import BaseGhost from "./baseGhost";
import Board from "../Board/board";

class Chaser extends BaseGhost{
    constructor(board: Board) {
        super(board)
        this.xPos = 490
        this.yPos = 350
        this.color = "red"
        this.tile = [((this.yPos - 210) / 20), ((this.xPos - 210) / 20)]
        this.home = [board.boardMatrix[1][54], board.boardMatrix[3][46]]
        this.homeTarget = board.boardMatrix[1][54]
        this.name = "Blinky"
    }

}

export default Chaser