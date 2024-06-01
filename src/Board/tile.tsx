class Tile {
    height: number
    width: number
    xPos: number
    yPos: number
    type: string
    image: any
    neightbors: Array<any>

    constructor(xPos: number, yPos: number) {
        this.height = 8
        this.width = 8
        this.xPos = xPos
        this.yPos = yPos
        this.type = "Coin"
        this.image = new Image()
        this.image.src = 'coin.png'
        this.neightbors = []
    }
}

export default Tile