// Pinky is a little more difficult than Blinky as
// she picks the spot 4 spots in front of Pacman. 
import BaseGhost from "./baseGhost";
import Board from "../Board/board";


class Ambusher extends BaseGhost{
    constructor(board: Board) {
        super(board)
        this.xPos = 530
        this.yPos = 350
        this.color = "pink"
        this.tile = [((this.yPos - 210) / 20), ((this.xPos - 210) / 20)]
        this.home = [board.boardMatrix[1][1], board.boardMatrix[1][4]]
        this.homeTarget = board.boardMatrix[1][1]
        this.name = "Pinky"
    }
}

export default Ambusher