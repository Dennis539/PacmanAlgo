import Wall from "./wall"
import Tile from "./tile"
import Player from "../Player/player"
import Chaser from "../Ghosts/Blinky"
import Ambusher from "../Ghosts/Pinky"
import Whimsical from "../Ghosts/Inky"
import Clyde from "../Ghosts/Clyde"

class Board {
    debug: boolean
    height: number
    width: number
    xPos: number
    yPos: number
    steps: number
    boardMatrix: Array<Array<any>>
    middlePosTile: Array<Array<number>>
    chaseTimeOut: number
    scatterTimeOut: number
    frightenedTimeOut: number
    lifeLost: boolean
    time: number
    setPinky: boolean
    setClyde: boolean
    setInky: boolean
    flicker: number
    gameOverScreen: boolean
    ghostToShowAlgo: "Blinky" | "Pinky" | "Inky" | "Clyde"

    constructor(
        chaseTimeOut: number,
        scatterTimeOut: number,
        frightenedTimeOut: number
    ) {
        this.debug = true
        this.height = 600
        this.width = 0
        this.xPos = 150
        this.yPos = 150
        this.steps = 20
        this.boardMatrix = []
        this.createBoard()
        this.middlePosTile = this.calculateMiddlePosTile() // All the middle points of the tiles within the boardGrid.
        this.chaseTimeOut = chaseTimeOut
        this.scatterTimeOut = scatterTimeOut
        this.frightenedTimeOut = frightenedTimeOut
        this.lifeLost = false
        this.time = 1
        this.setPinky = false
        this.setClyde = false
        this.setInky = false
        this.flicker = 0
        this.gameOverScreen = false
        this.ghostToShowAlgo = "Pinky"
    }

    calculateMiddlePosTile() {
        let middlePosTile = []
        for (let i = 0; i < this.boardMatrix.length; i++) {
            for (let j = 0; j < this.boardMatrix[i].length; j++) {
                if (this.boardMatrix[i][j]) {
                    middlePosTile.push([
                        this.boardMatrix[i][j].xPos + 10,
                        this.boardMatrix[i][j].yPos + 10
                    ])
                }
            }
        }
        return middlePosTile
    }

    createBoard() {
        let constructMatrix: Array<Array<string>>
        var preConstructMatrix = [
            "W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	N\tW\tW	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W",
            "W	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	W	N\tW\tC	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	W",
            "W	C	W	W	W	W	C	W	W	W	C	C	W	W	W	W	C	W	N\tW\tC	WR	WR	WR	WR	WR	WR	WR	WR	C	WY	WY	WY	WY	WY	WY	WY	WY	C	WG	WG	WG	WG	WG	WG	WG	WG	C	W	W	W	W	W	W	W	C	W",
            "W	C	W	W	W	W	C	W	W	W	C	W	W	W	W	W	C	W	W\tW\tC	WR	W	W	W	W	W	W	WR	C	WY	W	W	W	W	W	W	WY	C	WG	W	W	W	W	W	W	WG	C	W	W	W	W	W	W	W	C	W",
            "W	CP	C	C	C	C	C	W	W	W	W	W	W	W	W	C	C	C	C\tC\tC	WR	W	WR	WR	WR	WR	WR	WR	C	WY	W	WY	WY	WY	WY	WY	WY	C	WG	W	WG	WG	WG	WG	WG	WG	C	C	C	C	C	C	C	C	CP	W",
            "W	W	W	W	W	W	C	W	W	W	W	W	W	W	C	C	W	W	W\tW\tC	WR	W	WR	CP	C	C	C	C	C	WY	W	WY	C	C	C	C	C	C	WG	W	WG	C	C	C	C	C	C	W	W	C	W	W	W	W	W	W",
            "N	N	N	N	N	W	C	W	W	W	W	W	W	W	C	W	W	N	N\tW\tC	WR	W	WR	WR	WR	WR	WR	WR	C	WY	W	WY	WY	WY	WY	WY	WY	C	WG	W	WG	WG	WG	WG	WG	WG	C	W	W	C	W	N	N	N	N	N",
            "W	W	W	W	W	W	C	W	W	W	W	W	W	C	C	W	N	N	N\tW\tC	WR	W	W	W	W	W	W	WR	C	WY	W	W	W	W	W	W	WY	C	WG	W	W	W	W	W	W	WG	C	W	W	C	W	W	W	W	W	W",
            "WN	C	C	C	C	C	C	W	W	W	W	W	W	W	C	W	W	N	N\tW\tC	WR	W	WR	WR	WR	WR	WR	WR	C	WY	W	WY	WY	WY	WY	WY	WY	C	WG	WG	WG	WG	WG	WG	W	WG	C	W	W	C	C	C	C	C	C	W",
            "W	W	W	W	W	W	C	W	W	W	W	W	W	W	C	C	W	W	W\tW\tC	WR	W	WR	C	C	C	C	C	C	WY	W	WY	C	C	C	C	C	C	C	C	C	C	C	WG	W	WG	C	W	W	C	W	W	W	W	W	W",
            "N	N	N	N	N	W	C	W	W	W	W	W	W	W	W	C	C	C	C\tC\tC	WR	W	WR	WR	WR	WR	WR	WR	C	WY	W	WY	WY	WY	WY	WY	WY	C	WG	WG	WG	WG	WG	WG	W	WG	C	W	W	C	W	N	N	N	N	N",
            "W	W	W	W	W	W	C	W	W	W	C	W	W	W	W	W	C	W	W\tW\tC	WR	W	W	W	W	W	W	WR	C	WY	W	W	W	W	W	W	WY	C	WG	W	W	W	W	W	W	WG	C	C	C	C	W	W	W	W	W	W",
            "W	C	C	C	C	C	C	W	W	W	C	C	W	W	W	W	C	W	N\tW\tC	WR	WR	WR	WR	WR	WR	WR	WR	C	WY	WY	WY	WY	WY	WY	WY	WY	C	WG	WG	WG	WG	WG	WG	WG	WG	C	W	W	C	C	C	C	C	C	W",
            "W	C	W	W	W	W	C	C	C	C	C	C	C	C	C	C	C	W	N\tW\tC	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	W	W	W	C	W	W	W	C	W",
            "W	C	W	W	W	W	C	W	W	W	W	W	W	W	W	W	C	W	N\tW\tC	W	W	W	W	W	W	W	W	W	W	W	C	W	W	C	W	W	W	W	W	W	W	W	W	W	W	C	W	W	W	C	W	W	W	C	W",
            "W	C	W	W	W	W	C	W	W	W	W	W	W	W	W	W	C	W	N\tW\tC	W	W	W	W	W	W	W	W	W	W	W	C	W	W	C	W	W	W	W	W	W	W	W	W	W	W	C	W	W	W	C	W	W	W	C	W",
            "W	CP	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	W	N\tW\tC	C	C	C	C	C	C	C	C	C	C	C	C	W	W	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	CP	W",
            "W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	N\tW\tW	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W"
        ]
        var x = this.xPos + 50
        var y = this.yPos + 50
        this.width = preConstructMatrix[0].split("\t").length * this.steps + 100
        this.height = preConstructMatrix.length * this.steps + 100
        var sideToSide = ""
        constructMatrix = preConstructMatrix.map((constructArray) =>
            constructArray.split("\t")
        )

        let lineBeginX: number = 1
        let lineBeginY: number = 1
        let lineEndX: number = 1
        let lineEndY: number = 1

        for (let i = 0; i < constructMatrix.length; i++) {
            var boardArray = []
            for (let j = 0; j < constructMatrix[i].length; j++) {
                if (constructMatrix[i][j].includes("W")) {
                    if (
                        j === 0 ||
                        i === 0 ||
                        j === constructMatrix[i].length - 1 ||
                        i === constructMatrix.length - 1
                    ) {
                        if (
                            i < constructMatrix.length - 1 &&
                            j < constructMatrix[0].length - 1 &&
                            constructMatrix[i + 1][j + 1].includes("C") &&
                            constructMatrix[i][j + 1].includes("W") &&
                            constructMatrix[i + 1][j].includes("W")
                        ) {
                            sideToSide = "rightToBottom"
                            lineBeginX = x + 20
                            lineBeginY = y + 10
                            lineEndX = x + 10
                            lineEndY = y + 20
                        } else if (
                            j < constructMatrix[0].length - 1 &&
                            i > 0 &&
                            constructMatrix[i - 1][j + 1].includes("C") &&
                            constructMatrix[i][j + 1].includes("W") &&
                            constructMatrix[i - 1][j].includes("W")
                        ) {
                            sideToSide = "rightToTop"
                            lineBeginX = x + 20
                            lineBeginY = y + 10
                            lineEndX = x + 10
                            lineEndY = y
                        } else if (
                            i < constructMatrix.length - 1 &&
                            j > 0 &&
                            constructMatrix[i + 1][j - 1].includes("C") &&
                            constructMatrix[i][j - 1].includes("W") &&
                            constructMatrix[i + 1][j].includes("W")
                        ) {
                            sideToSide = "leftToBottom"
                            lineBeginX = x + 20
                            lineBeginY = y + 10
                            lineEndX = x + 10
                            lineEndY = y + 20
                        } else if (
                            i > 0 &&
                            j > 0 &&
                            constructMatrix[i - 1][j - 1].includes("C") &&
                            constructMatrix[i][j - 1].includes("W") &&
                            constructMatrix[i - 1][j].includes("W")
                        ) {
                            sideToSide = "leftToTop"
                            lineBeginX = x
                            lineBeginY = y
                            lineEndX = x + 10
                            lineEndY = y + 10
                        } else if (
                            i === 0 ||
                            i === constructMatrix.length - 1
                        ) {
                            sideToSide = "leftToRight"
                            lineBeginX = x
                            lineBeginY = y + 10
                            lineEndX = x + 20
                            lineEndY = y + 10
                        } else if (
                            j === 0 ||
                            j === constructMatrix[0].length - 1
                        ) {
                            sideToSide = "upToBottom"
                            lineBeginX = x + 10
                            lineBeginY = y
                            lineEndX = x + 10
                            lineEndY = y + 20
                        }
                    } else if (
                        j !== 0 &&
                        j !== constructMatrix[i].length - 1 &&
                        i !== 0 &&
                        i !== constructMatrix.length - 1
                    ) {
                        if (
                            constructMatrix[i - 1][j].includes("W") &&
                            constructMatrix[i + 1][j].includes("W") &&
                            constructMatrix[i][j - 1].includes("W") &&
                            constructMatrix[i][j + 1].includes("W") &&
                            constructMatrix[i - 1][j - 1].includes("W") &&
                            constructMatrix[i + 1][j + 1].includes("W") &&
                            constructMatrix[i + 1][j - 1].includes("W") &&
                            constructMatrix[i - 1][j + 1].includes("W")
                        ) {
                            sideToSide = "surrounded"
                            lineBeginX = x + 10
                            lineBeginY = y
                            lineEndX = x + 10
                            lineEndY = y + 20
                        } else if (
                            (constructMatrix[i - 1][j - 1].includes("C") &&
                                !constructMatrix[i + 1][j + 1].includes("C") &&
                                constructMatrix[i - 1][j + 1].includes("C") &&
                                constructMatrix[i + 1][j - 1].includes("C")) ||
                            (!constructMatrix[i - 1][j - 1].includes("C") &&
                                constructMatrix[i + 1][j + 1].includes("C") &&
                                !constructMatrix[i - 1][j + 1].includes("C") &&
                                !constructMatrix[i + 1][j - 1].includes("C") &&
                                !constructMatrix[i + 1][j].includes("C") &&
                                !constructMatrix[i][j + 1].includes("C")) ||
                            (constructMatrix[i - 1][j - 1].includes("C") &&
                                constructMatrix[i - 1][j].includes("C") &&
                                constructMatrix[i][j - 1].includes("C"))
                        ) {
                            sideToSide = "rightToBottom"
                            lineBeginX = x + 20
                            lineBeginY = y + 10
                            lineEndX = x + 10
                            lineEndY = y + 20
                        } else if (
                            (constructMatrix[i - 1][j - 1].includes("C") &&
                                constructMatrix[i + 1][j + 1].includes("C") &&
                                constructMatrix[i - 1][j + 1].includes("C") &&
                                !constructMatrix[i + 1][j - 1].includes("C")) ||
                            (!constructMatrix[i - 1][j - 1].includes("C") &&
                                !constructMatrix[i + 1][j + 1].includes("C") &&
                                !constructMatrix[i - 1][j + 1].includes("C") &&
                                constructMatrix[i + 1][j - 1].includes("C") &&
                                !constructMatrix[i][j - 1].includes("C") &&
                                !constructMatrix[i + 1][j].includes("C") &&
                                !constructMatrix[i][j + 1].includes("C")) ||
                            (constructMatrix[i - 1][j].includes("C") &&
                                constructMatrix[i - 1][j + 1].includes("C") &&
                                constructMatrix[i][j + 1].includes("C"))
                        ) {
                            sideToSide = "leftToBottom"
                            lineBeginX = x
                            lineBeginY = y + 10
                            lineEndX = x + 10
                            lineEndY = y + 20
                        } else if (
                            (constructMatrix[i - 1][j - 1].includes("C") &&
                                constructMatrix[i + 1][j + 1].includes("C") &&
                                !constructMatrix[i - 1][j + 1].includes("C") &&
                                constructMatrix[i + 1][j - 1].includes("C")) ||
                            (!constructMatrix[i - 1][j - 1].includes("C") &&
                                !constructMatrix[i + 1][j + 1].includes("C") &&
                                constructMatrix[i - 1][j + 1].includes("C") &&
                                !constructMatrix[i + 1][j - 1].includes("C") &&
                                !constructMatrix[i - 1][j].includes("C") &&
                                !constructMatrix[i][j + 1].includes("C")) ||
                            (constructMatrix[i][j - 1].includes("C") &&
                                constructMatrix[i + 1][j - 1].includes("C") &&
                                constructMatrix[i + 1][j].includes("C"))
                        ) {
                            sideToSide = "rightToTop"
                            lineBeginX = x + 20
                            lineBeginY = y + 10
                            lineEndX = x + 10
                            lineEndY = y
                        } else if (
                            (!constructMatrix[i - 1][j - 1].includes("C") &&
                                constructMatrix[i + 1][j + 1].includes("C") &&
                                constructMatrix[i - 1][j + 1].includes("C") &&
                                constructMatrix[i + 1][j - 1].includes("C")) ||
                            (constructMatrix[i - 1][j - 1].includes("C") &&
                                !constructMatrix[i + 1][j + 1].includes("C") &&
                                !constructMatrix[i - 1][j + 1].includes("C") &&
                                !constructMatrix[i + 1][j - 1].includes("C") &&
                                !constructMatrix[i - 1][j].includes("C") &&
                                !constructMatrix[i][j - 1].includes("C")) ||
                            (constructMatrix[i][j + 1].includes("C") &&
                                constructMatrix[i + 1][j + 1].includes("C") &&
                                constructMatrix[i + 1][j].includes("C"))
                        ) {
                            sideToSide = "leftToTop"
                            lineBeginX = x + 10
                            lineBeginY = y
                            lineEndX = x + 10
                            lineEndY = y + 20
                        } else if (
                            constructMatrix[i][j - 1].includes("W") &&
                            constructMatrix[i][j + 1].includes("W")
                        ) {
                            sideToSide = "leftToRight"
                            lineBeginX = x
                            lineBeginY = y + 10
                            lineEndX = x + 20
                            lineEndY = y + 10
                        } else if (
                            constructMatrix[i - 1][j].includes("W") &&
                            constructMatrix[i + 1][j].includes("W")
                        ) {
                            sideToSide = "upToBottom"
                            lineBeginX = x + 10
                            lineBeginY = y
                            lineEndX = x + 10
                            lineEndY = y + 20
                        } else {
                            sideToSide = ""
                            lineBeginX = x + 10
                            lineBeginY = y
                            lineEndX = x + 10
                            lineEndY = y + 20
                        }
                    }
                    let wallColor: string
                    if (constructMatrix[i][j] === "WR") {
                        wallColor = "red"
                    } else if (constructMatrix[i][j] === "WG") {
                        wallColor = "lawngreen"
                    } else if (constructMatrix[i][j] === "WY") {
                        wallColor = "yellow"
                    } else {
                        wallColor = "blue"
                    }

                    boardArray.push(
                        new Wall(
                            x,
                            y,
                            sideToSide,
                            lineBeginX,
                            lineBeginY,
                            lineEndX,
                            lineEndY,
                            wallColor
                        )
                    )
                } else if (constructMatrix[i][j].includes("C")) {
                    if (constructMatrix[i][j] === "CP") {
                        boardArray.push(new Tile(x, y, "PowerUpCoin"))
                    } else {
                        boardArray.push(new Tile(x, y, "Coin"))
                    }
                } else if (constructMatrix[i][j] === "N") {
                    boardArray.push(new Tile(x, y, "None"))
                } else {
                    boardArray.push(null)
                }
                x += 20
            }
            this.boardMatrix.push(boardArray)
            y += 20
            x = this.xPos + 50
        }

        // North, West, South, East
        for (let i = 0; i < this.boardMatrix.length; i++) {
            for (let j = 0; j < this.boardMatrix[i].length; j++) {
                if (!this.boardMatrix[i][j]) {
                    continue
                }
                if (i === 0) {
                    if (j === 0) {
                        this.boardMatrix[i][j].neighbors = [
                            null,
                            this.boardMatrix[i + 1][j],
                            this.boardMatrix[i][j + 1],
                            null
                        ]
                    } else if (j === this.boardMatrix[i].length - 1) {
                        this.boardMatrix[i][j].neighbors = [
                            null,
                            this.boardMatrix[i + 1][j],
                            null,
                            this.boardMatrix[i][j - 1]
                        ]
                    } else {
                        this.boardMatrix[i][j].neighbors = [
                            null,
                            this.boardMatrix[i + 1][j],
                            this.boardMatrix[i][j + 1],
                            this.boardMatrix[i][j - 1]
                        ]
                    }
                } else if (i === this.boardMatrix.length - 1) {
                    if (j === 0) {
                        this.boardMatrix[i][j].neighbors = [
                            this.boardMatrix[i - 1][j],
                            null,
                            this.boardMatrix[i][j + 1],
                            null
                        ]
                    } else if (j === this.boardMatrix[i].length - 1) {
                        this.boardMatrix[i][j].neighbors = [
                            this.boardMatrix[i - 1][j],
                            null,
                            null,
                            this.boardMatrix[i][j - 1]
                        ]
                    } else {
                        this.boardMatrix[i][j].neighbors = [
                            this.boardMatrix[i - 1][j],
                            null,
                            this.boardMatrix[i][j + 1],
                            this.boardMatrix[i][j - 1]
                        ]
                    }
                } else {
                    if (j === 0) {
                        this.boardMatrix[i][j].neighbors = [
                            this.boardMatrix[i - 1][j],
                            this.boardMatrix[i + 1][j],
                            this.boardMatrix[i][j + 1],
                            null
                        ]
                    } else if (j === this.boardMatrix[i].length - 1) {
                        this.boardMatrix[i][j].neighbors = [
                            this.boardMatrix[i - 1][j],
                            this.boardMatrix[i + 1][j],
                            null,
                            this.boardMatrix[i][j - 1]
                        ]
                    } else {
                        this.boardMatrix[i][j].neighbors = [
                            this.boardMatrix[i - 1][j],
                            this.boardMatrix[i + 1][j],
                            this.boardMatrix[i][j + 1],
                            this.boardMatrix[i][j - 1]
                        ]
                    }
                }
            }
        }
    }

    checkPlayerWallCollision(player: Player, newX: number, newY: number) {
        for (let i = 0; i < this.boardMatrix.length; i++) {
            for (let tile of this.boardMatrix[i]) {
                if (!tile || tile.type !== "Wall") {
                    continue
                }
                let wall = tile
                if (wall.wallDir === "upToBottom") {
                    let wallX = wall.lineBeginX - 1
                    let wallY = wall.yPos
                    for (let i = 0; i < 20; i++) {
                        const distX = wallX - newX
                        const distY = wallY - newY

                        const distance = (distX * distX + distY * distY) ** 0.5
                        const addRadius = newX < wallX ? +1 : +2
                        if (distance < player.radius + addRadius) {
                            if (i === 19) {
                                if (wallX <= player.xPos) {
                                    player.xPos += 2
                                } else {
                                    player.xPos -= 2
                                }
                            }
                            return true
                        }
                        wallY += 1
                    }
                } else if (wall.wallDir === "leftToRight") {
                    let wallX = wall.xPos
                    let wallY = wall.lineBeginY - 1
                    for (let i = 0; i < 20; i++) {
                        const distX = wallX - newX
                        const distY = wallY - newY

                        const distance = (distX * distX + distY * distY) ** 0.5
                        const addRadius = newY < wallY ? +1 : +2

                        if (distance < player.radius + addRadius) {
                            return true
                        }
                        wallX += 1
                    }
                } else if (wall.wallDir === "rightToBottom") {
                    let wallX = wall.xPos + 19
                    let wallY = wall.yPos + 9
                    for (let i = 0; i < 10; i++) {
                        const distX = wallX - newX
                        const distY = wallY - newY

                        const distance = (distX * distX + distY * distY) ** 0.5
                        if (distance < player.radius + 1) {
                            if (player.direction === "right") {
                                player.yPos -= 2
                                return true
                            }
                            if (player.direction === "down") {
                                player.xPos -= 2
                                return true
                            }

                            return true
                        }
                        wallX -= 1
                    }
                    for (let i = 0; i < 10; i++) {
                        const distX = wallX - newX
                        const distY = wallY - newY

                        const distance = (distX * distX + distY * distY) ** 0.5
                        if (distance < player.radius + 1) {
                            if (player.direction === "right") {
                                player.yPos -= 2
                                return true
                            } else if (player.direction === "down") {
                                player.xPos -= 2
                                return true
                            }

                            return true
                        }
                        wallY += 1
                    }
                } else if (wall.wallDir === "leftToBottom") {
                    let wallX = wall.xPos
                    let wallY = wall.yPos + 9
                    for (let i = 0; i < 10; i++) {
                        const distX = wallX - newX
                        const distY = wallY - newY

                        const distance = (distX * distX + distY * distY) ** 0.5
                        if (distance < player.radius + 1) {
                            if (player.direction === "left") {
                                player.yPos -= 2
                                return true
                            }
                            if (player.direction === "down") {
                                player.xPos += 2
                                return true
                            }
                            return true
                        }
                        wallX += 1
                    }
                    for (let i = 0; i < 10; i++) {
                        const distX = wallX - newX
                        const distY = wallY - newY

                        const distance = (distX * distX + distY * distY) ** 0.5
                        if (distance < player.radius + 1) {
                            if (player.direction === "left") {
                                player.yPos -= 2
                                return true
                            } else if (player.direction === "down") {
                                player.xPos += 2
                                return true
                            }
                            return true
                        }
                        wallY += 1
                    }
                } else if (wall.wallDir === "rightToTop") {
                    let wallX = wall.xPos + 19
                    let wallY = wall.yPos + 10
                    for (let i = 0; i < 10; i++) {
                        const distX = wallX - newX
                        const distY = wallY - newY

                        const distance = (distX * distX + distY * distY) ** 0.5
                        if (distance < player.radius + 1) {
                            if (player.direction === "right") {
                                player.yPos += 2
                                return true
                            }
                            if (player.direction === "up") {
                                player.xPos -= 2
                                return true
                            }
                            return true
                        }
                        wallX -= 1
                    }
                    for (let i = 0; i < 10; i++) {
                        const distX = wallX - newX
                        const distY = wallY - newY

                        const distance = (distX * distX + distY * distY) ** 0.5
                        if (distance < player.radius + 1) {
                            if (player.direction === "right") {
                                player.yPos += 2
                                return true
                            } else if (player.direction === "up") {
                                player.xPos -= 2
                                return true
                            }
                            return true
                        }
                        wallY -= 1
                    }
                } else if (wall.wallDir === "leftToTop") {
                    let wallX = wall.xPos
                    let wallY = wall.yPos + 9
                    for (let i = 0; i < 11; i++) {
                        const distX = wallX - newX
                        const distY = wallY - newY

                        const distance = (distX * distX + distY * distY) ** 0.5
                        if (distance < player.radius + 1) {
                            if (player.direction === "left") {
                                player.yPos += 2
                                return true
                            }

                            if (player.direction === "up") {
                                player.xPos += 2
                                return true
                            }
                            return true
                        }
                        wallX += 1
                    }
                    for (let i = 0; i < 11; i++) {
                        const distX = wallX - newX
                        const distY = wallY - newY

                        const distance = (distX * distX + distY * distY) ** 0.5
                        if (distance < player.radius + 1) {
                            if (player.direction === "left") {
                                player.yPos += 1
                                return true
                            } else if (player.direction === "up") {
                                player.xPos += 2
                                return true
                            }
                            return true
                        }
                        wallY -= 1
                    }
                }
            }
        }
        return false
    }

    playerCoinCollision(player: Player, coin: Tile) {
        let testX = 0
        let testY = 0
        if (player.xPos < coin.xPos) {
            testX = coin.xPos
        } else if (player.xPos > coin.xPos + coin.width) {
            testX = coin.xPos + coin.width + 9
        }
        if (player.yPos < coin.yPos) {
            testY = coin.yPos
        } else if (player.yPos > coin.yPos + coin.height) {
            testY = coin.yPos + coin.height + 9
        }
        const distX = player.xPos - testX
        const distY = player.yPos - testY
        const distance = (distX * distX + distY * distY) ** 0.5
        if (distance <= player.radius) {
            player.score += 100
            let tempType = coin.type
            coin.type = "Tile"
            return tempType
        }
        return null
    }

    checkPlayerGhostcollision(
        ghost: Chaser | Ambusher | Whimsical | Clyde,
        player: Player
    ) {
        let distX: number = player.xPos - ghost.xPos
        let distY: number = player.yPos - ghost.yPos
        let dist: number = Math.sqrt(distX * distX + distY * distY)

        if (dist < ghost.radius + player.radius) {
            if (!ghost.touched && ghost.frightened) {
                // Last condition makes sure that the ghost cannot kill Pacman when travelling back to home
                const ghostLoc = this.boardMatrix[ghost.tile[0]][ghost.tile[1]]
                ghost.xPos = ghostLoc.xMiddle
                ghost.yPos = ghostLoc.yMiddle
                ghost.speed = 10
                ghost.touched = true
            } else if (ghost.speed === 10) {
            } else {
                this.lifeLost = true
                player.startAngle = Math.PI * 1.5
                player.endAngle = Math.PI * 1.5 - 0.05
            }
        }
    }

    endFrightened(ghost: Chaser | Ambusher | Whimsical | Clyde) {
        ghost.frightened = false
        ghost.touched = false
        if (ghost.name === "Blinky") {
            ghost.color = "red"
        }
        if (ghost.name === "Pinky") {
            ghost.color = "pink"
        }
        if (ghost.name === "Inky") {
            ghost.color = "lightblue"
        }
        if (ghost.name === "Clyde") {
            ghost.color = "orange"
        }
        ghost.speed = 2
    }
}

export default Board
