class Tile {
    height: number
    width: number
    xPos: number
    yPos: number
    xMiddle: number
    yMiddle: number
    type: string
    image: any
    neighbors: Array<any>

    constructor(xPos: number, yPos: number, type: string) {
        this.height = 8
        this.width = 8
        this.xPos = xPos
        this.yPos = yPos
        this.xMiddle = this.xPos + 10
        this.yMiddle = this.yPos + 10
        this.type = type
        this.image = new Image()
        this.image.src = 'coin.png'
        this.neighbors = []
    }
}

export default Tile