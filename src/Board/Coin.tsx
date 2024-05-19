class Coin {
    height: number
    width: number
    xPos: number
    yPos: number
    type: string

    constructor(xPos: number, yPos: number) {
        this.height = 20
        this.width = 20
        this.xPos = xPos
        this.yPos = yPos
        this.type = "Coin"
    }
}

export default Coin