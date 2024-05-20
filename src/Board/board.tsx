import Wall from "./wall"
import Coin from "./Coin"

class Board {
    height: number
    width: number
    xPos: number
    yPos: number
    steps: number
    walls: Array<Wall>
    coins: Array<Coin>

    constructor() {
        this.height = 600
        this.width = 0
        this.xPos = 150
        this.yPos = 150
        this.steps = 20
        this.walls = []
        this.coins = []
        this.createBoard()

    }

    createBoard() {
        let constructMatrix: Array<string>
        constructMatrix = [
            "W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W",
            "W	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	W	W	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	W",
            "W	C	W	W	W	W	C	W	W	W	C	C	W	W	W	W	C	W	W	C	W	W	W	W	W	W	W	W	C	W	W	W	W	W	W	W	W	C	W	W	W	W	W	W	W	W	C	W	W	W	W	W	W	W	C	W",
            "W	C	W	W	W	W	C	W	W	W	C	W	W	W	W	W	C	W	W	C	W	W	W	W	W	W	W	W	C	W	W	W	W	W	W	W	W	C	W	W	W	W	W	W	W	W	C	W	W	W	W	W	W	W	C	W",
            "W	C	C	C	C	C	C	W	W	W	W	W	W	W	W	C	C	C	C	C	W	W	W	W	W	W	W	W	C	W	W	W	W	W	W	W	W	C	W	W	W	W	W	W	W	W	C	C	C	C	C	C	C	C	C	W",
            "W	W	W	W	W	W	C	W	W	W	W	W	W	W	C	C	W	W	W	C	W	W	W	C	C	C	C	C	C	W	W	W	C	C	C	C	C	C	W	W	W	C	C	C	C	C	C	W	W	C	W	W	W	W	W	W",
            "N	N	N	N	N	W	C	W	W	W	W	W	W	W	C	W	W	W	W	C	W	W	W	W	W	W	W	W	C	W	W	W	W	W	W	W	W	C	W	W	W	W	W	W	W	W	C	W	W	C	W	N	N	N	N	N",
            "W	W	W	W	W	W	C	W	W	W	W	W	W	C	C	W	W	W	W	C	W	W	W	W	W	W	W	W	C	W	W	W	W	W	W	W	W	C	W	W	W	W	W	W	W	W	C	W	W	C	W	W	W	W	W	W",
            "W	C	C	C	C	C	C	W	W	W	W	W	W	W	C	W	W	W	W	C	W	W	W	W	W	W	W	W	C	W	W	W	W	W	W	W	W	C	W	W	W	W	W	W	W	W	C	W	W	C	C	C	C	C	C	W",
            "W	W	W	W	W	W	C	W	W	W	W	W	W	W	C	C	W	W	W	C	W	W	W	C	C	C	C	C	C	W	W	W	C	C	C	C	C	C	C	C	C	C	C	W	W	W	C	W	W	C	W	W	W	W	W	W",
            "N	N	N	N	N	W	C	W	W	W	W	W	W	W	W	C	C	C	C	C	W	W	W	W	W	W	W	W	C	W	W	W	W	W	W	W	W	C	W	W	W	W	W	W	W	W	C	W	W	C	W	N	N	N	N	N",
            "W	W	W	W	W	W	C	W	W	W	C	W	W	W	W	W	C	W	W	C	W	W	W	W	W	W	W	W	C	W	W	W	W	W	W	W	W	C	W	W	W	W	W	W	W	W	C	C	C	C	W	W	W	W	W	W",
            "W	C	C	C	C	C	C	W	W	W	C	C	W	W	W	W	C	W	W	C	W	W	W	W	W	W	W	W	C	W	W	W	W	W	W	W	W	C	W	W	W	W	W	W	W	W	C	W	W	C	C	C	C	C	C	W",
            "W	C	W	W	W	W	C	C	C	C	C	C	C	C	C	C	C	W	W	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	W	W	W	C	W	W	W	C	W",
            "W	C	W	W	W	W	C	W	W	W	W	W	W	W	W	W	C	W	W	C	W	W	W	W	W	W	W	W	W	W	W	C	W	W	C	W	W	W	W	W	W	W	W	W	W	W	C	W	W	W	C	W	W	W	C	W",
            "W	C	W	W	W	W	C	W	W	W	W	W	W	W	W	W	C	W	W	C	W	W	W	W	W	W	W	W	W	W	W	C	W	W	C	W	W	W	W	W	W	W	W	W	W	W	C	W	W	W	C	W	W	W	C	W",
            "W	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	W	W	C	C	C	C	C	C	C	C	C	C	C	C	C	W	W	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	W",
            "W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W",

        ]
        var x = this.xPos + 50
        var y = this.yPos + 50
        this.width = (constructMatrix[0].split("\t").length * this.steps) + 100
        this.height = (constructMatrix.length * this.steps) + 100
        var sideToSide = ""
        for (let i = 0; i < constructMatrix.length; i++) {
            constructMatrix[i] = constructMatrix[i].split("\t")
        }


        for (let i = 0; i < constructMatrix.length; i++) {
            var boardArray = []
            for (let j = 0; j < constructMatrix[i].length; j++) {
                if (constructMatrix[i][j] === "W") {
                    if (j === 0
                        || i === 0
                        || j === constructMatrix[i].length - 1
                        || i === constructMatrix.length - 1) {

                        if (i < constructMatrix.length - 1 && j < constructMatrix[0].length - 1
                            && constructMatrix[i + 1][j + 1] === "C"
                            && constructMatrix[i][j + 1] === "W"
                            && constructMatrix[i+1][j] === "W"
                        ) {
                            sideToSide = "rightToBottom"
                        }
                        else if (j < constructMatrix[0].length - 1 && i > 0
                            && constructMatrix[i - 1][j + 1] === "C"
                            && constructMatrix[i][j + 1] === "W"
                            && constructMatrix[i-1][j] === "W"
                        ) {
                            sideToSide = "rightToTop"
                        }
                        else if (i < constructMatrix.length - 1 && j > 0
                            && constructMatrix[i + 1][j - 1] === "C"
                            && constructMatrix[i][j - 1] === "W"
                            && constructMatrix[i+1][j] === "W"
                        ) {
                            sideToSide = "leftToBottom"
                        }
                        else if (i >0 && j > 0
                            && constructMatrix[i - 1][j - 1] === "C"
                            && constructMatrix[i][j - 1] === "W"
                            && constructMatrix[i-1][j] === "W"
                        ) {
                            sideToSide = "leftToTop"
                        }


                        else if (i === 0 || i === constructMatrix.length - 1) {
                            sideToSide = "leftToRight"
                        }
                        else if (j === 0 || j === constructMatrix[0].length - 1) {
                            sideToSide = "upToBottom"
                        }
                    }

                    else if (j !== 0
                        && j !== constructMatrix[i].length -1
                        && i !== 0
                        && i !== constructMatrix.length-1) {
                        if (
                            constructMatrix[i - 1][j] === "W"
                            && constructMatrix[i + 1][j] === "W" 
                            && constructMatrix[i][j - 1] === "W"
                            && constructMatrix[i][j + 1] === "W"
                            && constructMatrix[i - 1][j -1] === "W"
                            && constructMatrix[i + 1][j+1] === "W" 
                            && constructMatrix[i+1][j - 1] === "W"
                            && constructMatrix[i-1][j + 1] === "W"
                        ) {
                            sideToSide = "surrounded"
                        }
                        else if (
                            (
                                constructMatrix[i - 1][j - 1] === "C"
                                && constructMatrix[i + 1][j + 1] !== "C"
                                && constructMatrix[i - 1][j + 1] === "C"
                                && constructMatrix[i + 1][j - 1] === "C"
                            )
                            ||
                            (
                                constructMatrix[i - 1][j - 1] !== "C"
                                && constructMatrix[i + 1][j + 1] === "C"
                                && constructMatrix[i - 1][j + 1] !== "C"
                                && constructMatrix[i + 1][j - 1] !== "C"
                                && (constructMatrix[i+1][j] !== "C" && constructMatrix[i][j+1] !== "C")
                            )
                            ||
                            (
                                constructMatrix[i - 1][j - 1] === "C"
                                && constructMatrix[i - 1][j] === "C"
                                // && constructMatrix[i - 1][j+1] === "C"
                                && constructMatrix[i][j - 1] === "C"
                            )

                        ) {
                            sideToSide = "rightToBottom"
                        }
                            
                        else if (
                            (
                                constructMatrix[i - 1][j - 1] === "C"
                                && constructMatrix[i + 1][j + 1] === "C"
                                && constructMatrix[i - 1][j + 1] === "C"
                                && constructMatrix[i + 1][j - 1] !== "C"
                            )
                            ||
                            (
                                constructMatrix[i - 1][j - 1] !== "C"
                                && constructMatrix[i + 1][j + 1] !== "C"
                                && constructMatrix[i - 1][j + 1] !== "C"
                                && constructMatrix[i + 1][j - 1] === "C"
                                && (constructMatrix[i+1][j] !== "C" && constructMatrix[i][j+1] !== "C")
                            )
                            ||
                            (
                                constructMatrix[i - 1][j] === "C"
                                && constructMatrix[i - 1][j + 1] === "C"
                                && constructMatrix[i][j+1] === "C"
                            )
                        ) {
                            sideToSide = "leftToBottom"
                        }
                            
                        
                        else if (
                            (
                                constructMatrix[i - 1][j - 1] === "C"
                                && constructMatrix[i + 1][j + 1] === "C"
                                && constructMatrix[i - 1][j + 1] !== "C"
                                && constructMatrix[i + 1][j - 1] === "C"
                            )
                            ||
                            (
                                constructMatrix[i - 1][j - 1] !== "C"
                                && constructMatrix[i + 1][j + 1] !== "C"
                                && constructMatrix[i - 1][j + 1] === "C"
                                && constructMatrix[i + 1][j - 1] !== "C"
                                && (constructMatrix[i-1][j] !== "C" && constructMatrix[i][j+1] !== "C")
                            )
                            ||
                            (
                                constructMatrix[i][j-1] === "C"
                                && constructMatrix[i + 1][j - 1] === "C"
                                && constructMatrix[i+1][j] === "C"
                            )
                        ) {
                            sideToSide = "rightToTop"
                        }
                        else if (
                            (
                                constructMatrix[i - 1][j - 1] !== "C"
                                && constructMatrix[i + 1][j + 1] === "C"
                                && constructMatrix[i - 1][j + 1] === "C"
                                && constructMatrix[i + 1][j - 1] === "C"
                            )
                            ||
                            (
                                constructMatrix[i - 1][j - 1] === "C"
                                && constructMatrix[i + 1][j + 1] !== "C"
                                && constructMatrix[i - 1][j + 1] !== "C"
                                && constructMatrix[i + 1][j - 1] !== "C"
                                && constructMatrix[i-1][j] !== "C"
                            )
                            ||
                            (
                                constructMatrix[i][j + 1] === "C"
                                && constructMatrix[i+1][j+1] === "C"
                                && constructMatrix[i+1][j] === "C"
                            )
                        ){
                            sideToSide = "leftToTop"
                        }

                        else if (constructMatrix[i][j - 1] === "W"
                            && constructMatrix[i][j + 1] === "W"
                        ) {
                            sideToSide = "leftToRight"
                        }
                        else if (constructMatrix[i - 1][j] === "W"
                            && constructMatrix[i + 1][j] === "W"
                        ) {
                            sideToSide = "upToBottom"
                        }
                            
                        else {
                            sideToSide = ""
                        }
                    }

                    this.walls.push(new Wall(x,y, sideToSide))
                } else if (constructMatrix[i][j] === "C") {
                    this.coins.push(new Coin(x,y))
                } else {
                    boardArray.push(null)
                }
                x += 20
            }
            y += 20
            x = this.xPos + 50
        }
    }

    


}

export default Board