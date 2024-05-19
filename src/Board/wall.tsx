class Wall {
    height: number
    width: number
    xPos: number
    yPos: number
    type: string
    wallDir: string

    constructor(xPos: number, yPos: number, wallDir: string) {
        this.height = 20
        this.width = 20
        this.xPos = xPos
        this.yPos = yPos
        this.type = "Wall"
        this.wallDir = wallDir
    }

    checkWallDir() {
        
    }
}

export default Wall