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
        this.xPos = 100
        this.yPos = 100
        this.radius = 10
        this.direction = ""
    }

    move(keys: any, canvas: any) {
        if ("ArrowLeft" in keys) {
            this.direction = "left"
            this.xPos -= 2
        }
        else if ("ArrowRight" in keys) {
            this.direction = "right"
            this.xPos += 2

        }
        else if ("ArrowUp" in keys) {
            this.direction = "up"
            this.yPos -= 2

        }
        else if ("ArrowDown" in keys) {
            this.direction = "right"
            this.yPos += 2

        }
    }

}
export default Player