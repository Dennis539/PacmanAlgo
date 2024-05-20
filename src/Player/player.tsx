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
        this.radius = 15
        this.speed = 4
        this.direction = ""
    }

    move(keys: any, canvas: any) {
        if ("ArrowLeft" in keys) {
            this.direction = "left"
            this.xPos -= this.speed
        }
        else if ("ArrowRight" in keys) {
            this.direction = "right"
            this.xPos += this.speed

        }
        else if ("ArrowUp" in keys) {
            this.direction = "up"
            this.yPos -= this.speed

        }
        else if ("ArrowDown" in keys) {
            this.direction = "right"
            this.yPos += this.speed

        }
    }

}
export default Player