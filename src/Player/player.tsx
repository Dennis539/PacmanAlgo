class Player {
    xPos: number
    yPos: number
    radius: number
    xMovement: number
    yMovement: number
    direction: string
    speed: number
    constructor() {
        this.xMovement = 0
        this.yMovement = 0
        this.xPos = 590
        this.yPos = 500
        this.radius = 18
        this.speed = 2
        this.direction = ""
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

    move(keys: any, canvas: any) {
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
    }

}
export default Player