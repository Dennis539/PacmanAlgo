import BaseGhost from "./baseGhost"
import Board from "../Board/board"

class Clyde extends BaseGhost {
    lost: boolean
    constructor(board: Board) {
        super(board)
        this.xPos = 570
        this.yPos = 330
        this.color = "orange"
        this.tile = [(this.yPos - 210) / 20, (this.xPos - 210) / 20]
        let y1 = board.boardMatrix.length - 2
        let y2 = board.boardMatrix.length - 6
        this.home = [board.boardMatrix[y1][1], board.boardMatrix[y2][1]]
        this.homeTarget = board.boardMatrix[y1][1]
        this.name = "Clyde"
        this.lost = false
    }

    enter() {
        if (!this.hasEntered && (this.xPos !== 490 || this.yPos !== 350)) {
            if (!this.hasEntered && this.yPos !== 350) {
                this.yPos += 1
            } else if (!this.hasEntered && this.xPos !== 490) {
                console.log("Kees here")
                this.xPos -= 1
            }
        } else {
            this.tile = [(this.yPos - 210) / 20, (this.xPos - 210) / 20]
        }
    }
}

export default Clyde
