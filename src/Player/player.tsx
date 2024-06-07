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
        this.tile = [Math.floor((this.yPos-200)/20),Math.floor((this.xPos-200)/20)] // Y and X index of the boardGrid. 
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
        this.tile = [Math.floor((this.yPos-200)/20),Math.floor((this.xPos-200)/20)]
    }

}
export default Player