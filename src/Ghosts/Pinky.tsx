// Pinky is a little more difficult than Blinky as
// she picks the spot 4 spots in front of Pacman. 
import BaseGhost from "./baseGhost";
import Board from "../Board/board";
import Chaser from "./Blinky";
import Player from "../Player/player";


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

    determineTarget(blinky: Chaser, player: Player, board: Board) {
        // Should be two tiles ahead but lazy
        let xDiff = blinky.xPos - player.fourTilesAhead[1]
        let yDiff = blinky.yPos - player.fourTilesAhead[0]
        let boardLen = board.boardMatrix.length
        let boardWidth = board.boardMatrix[0].length

        let xTarget
        let yTarget
        if (yDiff < 0) {
            yDiff *= -1
            if (player.fourTilesAhead[0] + yDiff > boardLen - 2) {
                yTarget = boardLen - 2
            } else {
                
            }
            if (xDiff < 0) {

            }
        }
    }
}

export default Ambusher