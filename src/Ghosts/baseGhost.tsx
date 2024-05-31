class BaseGhost {
    xPos: number
    yPos: number
    radius: number
    xMovement: number
    yMovement: number
    direction: string
    speed: number
    color: string
    constructor() {
        this.xMovement = 0
        this.yMovement = 0
        this.xPos = 590
        this.yPos = 500
        this.radius = 18
        this.speed = 1
        this.direction = "right"
        this.color = ""
    }
}

export default BaseGhost