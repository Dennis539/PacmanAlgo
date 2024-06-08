class Wall {
    height: number
    width: number
    xPos: number
    yPos: number
    xMiddle: number
    yMiddle: number
    type: string
    wallDir: string
    lineBeginX: number
    lineBeginY: number
    lineEndX: number
    lineEndY: number
    neighbors: Array<any>

    constructor(
        xPos: number, yPos: number, wallDir: string,
        lineBeginX: number, lineBeginY: number,
        lineEndX: number, lineEndY: number
    ) {
        this.height = 20
        this.width = 20
        this.xPos = xPos
        this.yPos = yPos
        this.xMiddle = this.xPos + 10
        this.yMiddle = this.xPos + 10
        this.type = "Wall"
        this.wallDir = wallDir
        this.lineBeginX = lineBeginX
        this.lineBeginY = lineBeginY
        this.lineEndX = lineEndX
        this.lineEndY = lineEndY
        this.neighbors = []
    }
 
}

export default Wall