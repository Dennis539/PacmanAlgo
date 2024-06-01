class Wall {
    height: number
    width: number
    xPos: number
    yPos: number
    type: string
    wallDir: string
    lineBeginX: number
    lineBeginY: number
    lineEndX: number
    lineEndY: number
    neightbors: Array<any>

    constructor(
        xPos: number, yPos: number, wallDir: string,
        lineBeginX: number, lineBeginY: number,
        lineEndX: number, lineEndY: number
    ) {
        this.height = 20
        this.width = 20
        this.xPos = xPos
        this.yPos = yPos
        this.type = "Wall"
        this.wallDir = wallDir
        this.lineBeginX = lineBeginX
        this.lineBeginY = lineBeginY
        this.lineEndX = lineEndX
        this.lineEndY = lineEndY
        this.neightbors = []
    }
 
}

export default Wall