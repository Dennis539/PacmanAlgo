import Board from "../Board/board"

class Player {
    xPos: number
    yPos: number
    radius: number
    direction: string
    speed: number
    score: number
    tile: Array<number>
    fourTilesAhead: Array<number>
    constructor() {
        this.xPos = 590
        this.yPos = 490
        this.radius = 18
        this.speed = 1
        this.direction = "up"
        this.score = 0
        this.tile = [Math.floor((this.yPos - 200) / 20), Math.floor((this.xPos - 200) / 20)] // Y and X index of the boardGrid. 
        this.fourTilesAhead = [Math.floor((this.yPos - 200) / 20)-4, Math.floor((this.xPos - 200) / 20)]
    }

    updateDirection(keys: any, board: Board) {
        let posDif = 4
        let x = this.tile[1]
        let y = this.tile[0]
        if ("ArrowLeft" in keys) {
            this.direction = "left"
            if (x <= 3) {
                this.fourTilesAhead = [y, 0]
            } else if (board.boardMatrix[y][x - 4] && board.boardMatrix[y][x - 4].type !== "Wall") {
                this.fourTilesAhead = [y, x-4]
            }
        }
        else if ("ArrowRight" in keys) {
            this.direction = "right"
            if (board.boardMatrix[0].length - x <= 3) {
                this.fourTilesAhead = [y, board.boardMatrix[0].length]
            } else if (board.boardMatrix[y][x + 4] && board.boardMatrix[y][x + 4].type !== "Wall") {
                this.fourTilesAhead = [y, x+4]
            }
        }
        else if ("ArrowUp" in keys) {
            this.direction = "up"
            if (y <= 3) {
                this.fourTilesAhead = [board.boardMatrix.length, x]
            } else if (board.boardMatrix[y-4][x] && board.boardMatrix[y-4][x].type !== "Wall") {
                this.fourTilesAhead = [y-4, x]
            }
        }
        else if ("ArrowDown" in keys) {
            this.direction = "down"
            if (board.boardMatrix.length-1 - y <= 3) {
                this.fourTilesAhead = [board.boardMatrix.length, x]
            } else if (board.boardMatrix[y+4][x] && board.boardMatrix[y+4][x].type !== "Wall") {
                this.fourTilesAhead = [y+4, x]
            }
        }
    }

    move(keys: any, board: Board) {
        if ("ArrowLeft" in keys) {
            this.xPos -= this.speed
        }
        else if ("ArrowRight" in keys) {
            this.xPos += this.speed

        }
        else if ("ArrowUp" in keys) {
            this.yPos -= this.speed

        }
        else if ("ArrowDown" in keys) {
            this.yPos += this.speed

        }
        this.tile = [Math.floor((this.yPos - 200) / 20), Math.floor((this.xPos - 200) / 20)]
        this.updateDirection(keys, board)
    }

}
export default Player