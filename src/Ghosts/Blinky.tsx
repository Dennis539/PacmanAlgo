// Clyde is supposed to be the simplest of the ghosts
// reason being that he just randomly moved through the board
import BaseGhost from "./baseGhost";
import Board from "../Board/board";

class Chaser extends BaseGhost{
    constructor(board: Board) {
        super(board)
        this.xPos = 490
        this.yPos = 350
        this.color = "red"
        this.tile = [((this.yPos-210)/20),((this.xPos-210)/20)]
    }

}

export default Chaser