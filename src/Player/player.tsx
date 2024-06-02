import Board from "../Board/board"

class Player {
    xPos: number
    yPos: number
    radius: number
    direction: string
    speed: number
    score: number
    tile: Array<number>
    constructor() {
        this.xPos = 590
        this.yPos = 490
        this.radius = 18
        this.speed = 1
        this.direction = "right"
        this.score = 0
        this.tile = [19,9] // X and Y index of the boardGrid. 
    }

    updateTile(board: Board) {
        let tileXPos = this.tile[0]
        let tileYPos = this.tile[0]
        let boardTile = board.boardMatrix[tileXPos][tileYPos]
        if (boardTile.middlePosTile) {
            if (boardTile.middlePosTile[0] - this.xPos < -10) {
                this.tile[0] += 1
            } else if (boardTile.middlePosTile[0] - this.xPos > 10) {
                this.tile[0] -= 1
            } else if (boardTile.middlePosTile[1] - this.yPos < -10) {
                this.tile[1] += 1
            } else if (boardTile.middlePosTile[1] - this.yPos > 10) {
                this.tile[1] -= 1
            }
        }

    }

    updateDirection(keys: any) {
        if ("ArrowLeft" in keys) {
            this.direction = "left"
        }
        else if ("ArrowRight" in keys) {
            this.direction = "right"

        }
        else if ("ArrowUp" in keys) {
            this.direction = "up"

        }
        else if ("ArrowDown" in keys) {
            this.direction = "down"
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
        this.updateTile(board)
    }

}
export default Player