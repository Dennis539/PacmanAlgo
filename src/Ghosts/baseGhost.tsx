import PriorityQueue from "priority-queue-typescript"
import Board from "../Board/board"
import Player from "../Player/player"
import Tile from "../Board/tile"
import Whimsical from "./Inky"
import Chaser from "./Blinky"

class BaseGhost {
    xPos: number
    yPos: number
    radius: number
    xMovement: number
    yMovement: number
    direction: string
    speed: number
    color: string
    neighbors: Array<any>
    nextTileCoord: Array<number>
    preVisited: Tile
    tile: Array<number>
    mode: string
    home: Array<Tile>
    homeTarget: Tile
    distanceTarget: number
    name: string
    endTile: Tile
    constructor(board: Board) {
        this.xMovement = 0
        this.yMovement = 0
        this.xPos = 590
        this.yPos = 510
        this.radius = 18
        this.speed = 1
        this.direction = "right"
        this.color = ""
        this.neighbors = []
        this.nextTileCoord = [] //[X, Y]
        this.preVisited = board.boardMatrix[0][0]
        this.tile = [((this.yPos - 210) / 20), ((this.xPos - 210) / 20)]
        this.mode = "chase"
        this.home = [board.boardMatrix[0][0], board.boardMatrix[0][0]]
        this.homeTarget = board.boardMatrix[0][0]
        this.distanceTarget = 999
        this.name = "Kees"
        this.endTile = board.boardMatrix[0][0]
    }

    determineEndtile(board: Board, endTileY: number, endTileX: number) {
        let endTile: Tile
        if (this.mode === "chase") {
            endTile = board.boardMatrix[endTileY][endTileX]
        } else if (this.mode === "scatter") {
            endTile = this.homeTarget
        } else {
            endTile = board.boardMatrix[endTileY][endTileX]
        }
        return endTile
    }

    move(board: Board, player: Player, ghostName: string, ghostMode: string, Inky: Whimsical, Blinky: Chaser) {
        // aStar will only run when the ghost is on the middlepos. Otherwise, move closer to the middlepos.
        const checkMiddlePosTile = board.middlePosTile.some((middleArray) => middleArray[0] === this.xPos && middleArray[1] === this.yPos)
        if (checkMiddlePosTile) {
            let beginTile = board.boardMatrix[this.tile[0]][this.tile[1]]
            if (ghostName === "Blinky") {
                this.endTile = this.determineEndtile(board, player.tile[0], player.tile[1])
            } else if (ghostName === "Pinky") {
                this.endTile = this.determineEndtile(board, player.fourTilesAhead[0], player.fourTilesAhead[1])
            } else if (ghostName === "Inky") {
                let inkyTargetCoord = Inky.determineTarget(Blinky, player, board)
                console.log(inkyTargetCoord)
                this.endTile = this.determineEndtile(board, inkyTargetCoord[0], inkyTargetCoord[1])
            } else {
                this.endTile = this.determineEndtile(board, player.fourTilesAhead[0], player.fourTilesAhead[1])
            }

            this.determine_neighbors(board.boardMatrix)
            console.log(beginTile, this.endTile, ghostName)
            this.aStarAlgorithm(board, beginTile, this.endTile, ghostName, ghostMode)
        } else {
            console.log("Kees on the move " + ghostName)
            if (this.xPos < this.nextTileCoord[0]) {
                this.xPos += this.speed
            } else if (this.xPos > this.nextTileCoord[0]) {
                this.xPos -= this.speed
            } else if (this.yPos < this.nextTileCoord[1]) {
                this.yPos += this.speed
            } else if (this.yPos > this.nextTileCoord[1]) {
                this.yPos -= this.speed
            }
        }
        this.tile = [((this.yPos-210)/20),((this.xPos-210)/20)]
    }

    determine_neighbors(grid: Array<Array<any>>) {
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                let node = grid[i][j]
                if (node) {
                    if (this.xPos >= node.xPos 
                        && this.xPos <= node.xPos + 19
                        && this.yPos >= node.yPos
                        && this.yPos <= node.yPos + 19
                    ) {
                        this.neighbors = node.neighbors
                    }
                }
            }
        }
    }

    aStarAlgorithm(board: Board, start: Tile, end: Tile, ghostName: string, ghostMode: string) {
        let count = 0
        let openSet = new PriorityQueue<Array<any>>()
        openSet.add([0,count,start])
        let cameFrom = new Map()
        let gScore = new Map()
        let fScore = new Map()
        let grid = board.boardMatrix
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (!grid[i][j] || grid[i][j].type === "Wall" || grid[i][j].type === "None") {
                    continue
                }
                let spot: Tile = grid[i][j]
                gScore.set(spot, Infinity)
                fScore.set(spot, Infinity)
            }
        }
        gScore.set(start, 0)
        let distX: number = Math.abs((start.xMiddle - end.xMiddle))
        let distY: number = Math.abs((start.yMiddle - end.yMiddle))
        
        fScore.set(start, Math.sqrt((distX * distX) + (distY * distY)))
        let openSetHash = new Set()
        openSetHash.add(start)

        while (!openSet.empty()) {
            let current: Tile = openSet.poll()![2]            
            openSetHash.delete(current)
            let curArr = []

            if (current === end) {
                if (ghostName === "Pinky") {
                    console.log("Ruige Pinky")
                }
                while (Array.from(cameFrom.keys()).includes(current)) {
                    current = cameFrom.get(current)
                    curArr.push(current)
                }
                this.distanceTarget = curArr.length

                if (this.distanceTarget <= 2 && this.mode === 'scatter') {
                    // switch locations of scatter mode depending on how close the ghost is to its target. 
                    if (this.homeTarget === this.home[0]) {
                        this.homeTarget = this.home[1]
                    } else {
                        this.homeTarget = this.home[0]
                    }
                }

                if (
                    (ghostName === "Pinky" && curArr.length <= 2 && ghostMode !== "scatter")
                    || (ghostName === "Inky" && curArr.length <= 2 && ghostMode !== "scatter")
                    || (ghostName === "Clyde" && curArr.length <= 8 && ghostMode !== "scatter")
                ) {
                    for (let neighbor of this.neighbors) {
                        if ((neighbor.type !== "Wall" && neighbor.type !== "None") && neighbor != this.preVisited) {
                            this.nextTileCoord = [neighbor.xMiddle, neighbor.yMiddle]
                            break
                        }
                    }
                    if (ghostName === "Clyde") {
                        this.mode = "scatter"
                    }

                } else {
                    this.nextTileCoord = [curArr[curArr.length - 2]!.xMiddle, curArr[curArr.length - 2]!.yMiddle]
                }
                
                this.preVisited = board.boardMatrix[this.tile[0]][this.tile[1]]

                if (this.xPos < this.nextTileCoord[0]) {
                    this.xPos += this.speed
                } else if (this.xPos > this.nextTileCoord[0]) {
                    this.xPos -= this.speed
                } else if (this.yPos < this.nextTileCoord[1]) {
                    this.yPos += this.speed
                } else if (this.yPos > this.nextTileCoord[1]) {
                    this.yPos -= this.speed
                }

                return
            }

            for (let neighbor of current.neighbors) {
                let sameAsPrev = neighbor.xMiddle === this.preVisited.xMiddle && neighbor.yMiddle === this.preVisited.yMiddle
                if (neighbor && neighbor.type !== "Wall" && neighbor.type !== "None" && neighbor !== this.preVisited) {
                    if (sameAsPrev) {
                        console.log("The same")
                    }
                    let tempGScore = gScore.get(current) + 1

                    if (tempGScore < gScore.get(neighbor)) {
                        cameFrom.set(neighbor, current)
                        gScore.set(neighbor, tempGScore)
                        let distX: number = Math.abs((neighbor.xMiddle - end.xMiddle))
                        let distY: number = Math.abs((neighbor.yMiddle - end.yMiddle))
                        let distance = Math.sqrt((distX * distX) + (distY * distY))
                        fScore.set(neighbor, tempGScore + distance)
                        
                        if (!openSetHash.has(neighbor)) {
                            count += 1
                            openSet.add([fScore.get(neighbor), count, neighbor])
                            openSetHash.add(neighbor)
                        }
                    }
                }
            }
        }
        // There is apparently a situation when Pinky has been randomly assigned a tile that it
        // will not be able to find. It will randomly assign a new tile in that case.
        if (ghostName === "Pinky") {
            for (let neighbor of this.neighbors) {
                console.log(neighbor)
                if (neighbor.type !== "Wall"  && neighbor.type !== "None" && neighbor != this.preVisited) {
                    this.nextTileCoord = [neighbor.xMiddle, neighbor.yMiddle]
                    console.log("Ruigie ruig")
                    console.log(this.nextTileCoord)
                    console.log(this.xPos, this.yPos)
                    break
                }
            }
        }
        this.preVisited = board.boardMatrix[this.tile[0]][this.tile[1]]

        if (this.xPos < this.nextTileCoord[0]) {
            this.xPos += this.speed
        } else if (this.xPos > this.nextTileCoord[0]) {
            this.xPos -= this.speed
        } else if (this.yPos < this.nextTileCoord[1]) {
            this.yPos += this.speed
        } else if (this.yPos > this.nextTileCoord[1]) {
            this.yPos -= this.speed
        }
    }
}

export default BaseGhost