class Coin {
    height: number
    width: number
    xPos: number
    yPos: number
    type: string
    image: any

    constructor(xPos: number, yPos: number) {
        this.height = 8
        this.width = 8
        this.xPos = xPos
        this.yPos = yPos
        this.type = "Coin"
        this.image = new Image()
        this.image.src = 'coin.png'
    }
}

export default Coin