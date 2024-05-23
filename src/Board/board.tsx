import Wall from "./wall"
import Coin from "./Coin"
import Player from "../Player/player"

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
        let constructMatrix: Array<Array<string>>
        var preConstructMatrix = [
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
        this.width = (preConstructMatrix[0].split("\t").length * this.steps) + 100
        this.height = (preConstructMatrix.length * this.steps) + 100
        var sideToSide = ""
        constructMatrix = preConstructMatrix.map((constructArray) => constructArray.split("\t"))

        let lineBeginX: number = 1
        let lineBeginY: number = 1
        let lineEndX: number = 1
        let lineEndY: number = 1

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
                            lineBeginX = x+20
                            lineBeginY = y+10
                            lineEndX = x+10
                            lineEndY = y+20
                        }
                        else if (j < constructMatrix[0].length - 1 && i > 0
                            && constructMatrix[i - 1][j + 1] === "C"
                            && constructMatrix[i][j + 1] === "W"
                            && constructMatrix[i-1][j] === "W"
                        ) {
                            sideToSide = "rightToTop"
                            lineBeginX = x+20
                            lineBeginY = y+10
                            lineEndX = x+10
                            lineEndY = y
                        }
                        else if (i < constructMatrix.length - 1 && j > 0
                            && constructMatrix[i + 1][j - 1] === "C"
                            && constructMatrix[i][j - 1] === "W"
                            && constructMatrix[i+1][j] === "W"
                        ) {
                            sideToSide = "leftToBottom"
                            lineBeginX = x + 20
                            lineBeginY = y+10
                            lineEndX = x+10
                            lineEndY = y+20
                        }
                        else if (i >0 && j > 0
                            && constructMatrix[i - 1][j - 1] === "C"
                            && constructMatrix[i][j - 1] === "W"
                            && constructMatrix[i-1][j] === "W"
                        ) {
                            sideToSide = "leftToTop"
                            lineBeginX = x
                            lineBeginY = y
                            lineEndX = x+10
                            lineEndY = y+10
                        }


                        else if (i === 0 || i === constructMatrix.length - 1) {
                            sideToSide = "leftToRight"
                            lineBeginX = x
                            lineBeginY = y+10
                            lineEndX = x+20
                            lineEndY = y+10
                        }
                        else if (j === 0 || j === constructMatrix[0].length - 1) {
                            sideToSide = "upToBottom"
                            lineBeginX = x+10
                            lineBeginY = y
                            lineEndX = x+10
                            lineEndY = y+20
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
                            lineBeginX = x + 10
                            lineBeginY = y
                            lineEndX = x+10
                            lineEndY = y+20
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
                                && constructMatrix[i][j - 1] === "C"
                            )

                        ) {
                            sideToSide = "rightToBottom"
                            lineBeginX = x+20
                            lineBeginY = y+10
                            lineEndX = x+10
                            lineEndY = y+20
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
                            lineBeginX = x
                            lineBeginY = y+10
                            lineEndX = x+10
                            lineEndY = y+20
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
                            lineBeginX = x+20
                            lineBeginY = y+10
                            lineEndX = x+10
                            lineEndY = y
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
                            lineBeginX = x + 10
                            lineBeginY = y
                            lineEndX = x+10
                            lineEndY = y+20
                        }

                        else if (constructMatrix[i][j - 1] === "W"
                            && constructMatrix[i][j + 1] === "W"
                        ) {
                            sideToSide = "leftToRight"
                            lineBeginX = x
                            lineBeginY = y+10
                            lineEndX = x+20
                            lineEndY = y+10
                        }
                        else if (constructMatrix[i - 1][j] === "W"
                            && constructMatrix[i + 1][j] === "W"
                        ) {
                            sideToSide = "upToBottom"
                            lineBeginX = x + 10
                            lineBeginY = y
                            lineEndX = x+10
                            lineEndY = y+20
                        }
                            
                        else {
                            sideToSide = ""
                            lineBeginX = x + 10
                            lineBeginY = y
                            lineEndX = x+10
                            lineEndY = y+20
                        }
                    }

                    this.walls.push(new Wall(x,y, sideToSide, lineBeginX, lineBeginY, lineEndX, lineEndY))
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


    checkPlayerWallCollision(player: Player, newX: number, newY: number) {
        for (let wall of this.walls) {
            if (wall.wallDir === "upToBottom") {
                let wallX = wall.lineBeginX -1
                let wallY = wall.yPos
                for (let i = 0; i < 20; i++){
                    const distX = wallX - newX
                    const distY = wallY - newY

                    const distance = ((distX * distX) + (distY * distY)) ** 0.5
                    const addRadius = newX < wallX ? +1 : +2
                    if (distance < player.radius+addRadius) {
                        return true
                    }
                    wallY += 1
                }
            }
            else if (wall.wallDir === "leftToRight") {
                let wallX = wall.xPos
                let wallY = wall.lineBeginY - 1
                for (let i = 0; i < 20; i++){
                    const distX = wallX - newX
                    const distY = wallY - newY

                    const distance = ((distX * distX) + (distY * distY)) ** 0.5
                    const addRadius = newY < wallY ? +1 : +2

                    if (distance < player.radius + addRadius) {
                        return true
                    }
                    wallX += 1
                }
            }
            else if (wall.wallDir === "rightToBottom") {
                let wallX = wall.xPos + 19
                let wallY = wall.yPos + 9
                for (let i = 0; i < 10; i++){
                    const distX = wallX - newX
                    const distY = wallY - newY

                    const distance = ((distX * distX) + (distY * distY)) ** 0.5
                    if (distance < player.radius + 1) {
                        if (player.direction === "right") {
                            console.log("Kees")
                            player.yPos -= 1
                            player.xPos += 1
                            return true
                        }
                        console.log(player.direction)
                        console.log("Uig")
                        return true
                    }
                    wallX -= 1
                }
                for (let i = 0; i < 10; i++){
                    const distX = wallX - newX
                    const distY = wallY - newY

                    const distance = ((distX * distX) + (distY * distY)) ** 0.5
                    if (distance < player.radius+1) {
                        return true
                    }
                    wallY += 1
                }
            }
            else if (wall.wallDir === "leftToBottom") {
                let wallX = wall.xPos 
                let wallY = wall.yPos + 9
                for (let i = 0; i < 10; i++){
                    const distX = wallX - newX
                    const distY = wallY - newY

                    const distance = ((distX * distX) + (distY * distY)) ** 0.5
                    if (distance < player.radius+1) {
                        return true
                    }
                    wallX += 1
                }
                for (let i = 0; i < 10; i++){
                    const distX = wallX - newX
                    const distY = wallY - newY

                    const distance = ((distX * distX) + (distY * distY)) ** 0.5
                    if (distance < player.radius+1) {
                        return true
                    }
                    wallY += 1
                }
            }
            else if (wall.wallDir === "rightToTop") {
                let wallX = wall.xPos +19
                let wallY = wall.yPos + 9
                for (let i = 0; i < 10; i++){
                    const distX = wallX - newX
                    const distY = wallY - newY

                    const distance = ((distX * distX) + (distY * distY)) ** 0.5
                    if (distance < player.radius+1) {
                        return true
                    }
                    wallX -= 1
                }
                for (let i = 0; i < 10; i++){
                    const distX = wallX - newX
                    const distY = wallY - newY

                    const distance = ((distX * distX) + (distY * distY)) ** 0.5
                    if (distance < player.radius+1) {
                        return true
                    }
                    wallY -= 1
                }
            }
            else if (wall.wallDir === "leftToTop") {
                let wallX = wall.xPos
                let wallY = wall.yPos + 9
                for (let i = 0; i < 10; i++){
                    const distX = wallX - newX
                    const distY = wallY - newY

                    const distance = ((distX * distX) + (distY * distY)) ** 0.5
                    if (distance < player.radius+1) {
                        return true
                    }
                    wallX += 1
                }
                for (let i = 0; i < 10; i++){
                    const distX = wallX - newX
                    const distY = wallY - newY

                    const distance = ((distX * distX) + (distY * distY)) ** 0.5
                    if (distance < player.radius+1) {
                        return true
                    }
                    wallY -= 1
                }
            }
        }
        return false
    }

 

}

export default Board