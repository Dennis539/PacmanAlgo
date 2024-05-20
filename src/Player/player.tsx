class Player {
    xPos: number
    yPos: number
    radius: number
    xMovement: number
    yMovement: number
    direction: string
    constructor() {
        this.xMovement = 0
        this.yMovement = 0
        this.xPos = 590
        this.yPos = 500
        this.radius = 15
        this.direction = ""
    }

    move(keys: any, canvas: any) {
        if ("ArrowLeft" in keys) {
            this.direction = "left"
            this.xPos -= 4
        }
        else if ("ArrowRight" in keys) {
            this.direction = "right"
            this.xPos += 4

        }
        else if ("ArrowUp" in keys) {
            this.direction = "up"
            this.yPos -= 4

        }
        else if ("ArrowDown" in keys) {
            this.direction = "right"
            this.yPos += 4

        }
    }

}
export default Player