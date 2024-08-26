class Tile {
    height: number
    width: number
    xPos: number
    yPos: number
    xMiddle: number
    yMiddle: number
    type: string
    neighbors: Array<any>
    lighter: boolean
    darker: boolean
    lightness: number

    constructor(xPos: number, yPos: number, type: string) {
        this.height = 8
        this.width = 8
        this.xPos = xPos
        this.yPos = yPos
        this.xMiddle = this.xPos + 10
        this.yMiddle = this.yPos + 10
        this.type = type
        this.neighbors = []
        this.lighter = true
        this.darker = false
        this.lightness = 50
    }

    updateLightness() {
        // lighter
        if (this.lighter && this.lightness < 100) {
            this.lightness += 1
        }

        // ligher stop
        else if (this.lightness >= 100) {
            this.lighter = false
            this.darker = true
            this.lightness -= 1
        }

        // fade out
        else if (this.darker && this.lightness > 50) {
            this.lightness -= 1
        }

        // fade out stop
        else if (this.darker && this.lightness <= 50) {
            this.lighter = true
            this.darker = false
            this.lightness += 1
        }
    }
}

export default Tile
