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
    direction: string
    speed: number
    color: string
    neighbors: Array<any>
    nextTileCoord: Array<number>
    prevTileCoord: Array<number>
    preVisited: Tile
    tile: Array<number>
    mode: string
    home: Array<Tile>
    homeTarget: Tile
    name: string
    endTile: Tile
    frightened: boolean
    beginTimeMode: number
    endTimeMode: number
    beginTimeFrightened: number
    endTimeFrightened: number
    phaseChange: boolean
    touched: boolean
    hasEntered: boolean
    constructor(board: Board) {
        this.xPos = 590
        this.yPos = 510
        this.radius = 18
        this.speed = 2
        this.direction = "right"
        this.color = ""
        this.neighbors = []
        this.nextTileCoord = [] //[X, Y]
        this.prevTileCoord = []
        this.preVisited = board.boardMatrix[0][0]
        this.tile = [((this.yPos - 210) / 20), ((this.xPos - 210) / 20)]
        this.mode = "chase"
        this.home = [board.boardMatrix[0][0], board.boardMatrix[0][0]]
        this.homeTarget = board.boardMatrix[0][0]
        this.name = "Kees"
        this.endTile = board.boardMatrix[0][0]
        this.frightened = false
        this.beginTimeMode = Math.floor(Date.now()/1000)
        this.endTimeMode = Math.floor(Date.now()/1000)
        this.beginTimeFrightened = 0
        this.endTimeFrightened = 0
        this.phaseChange = false
        this.touched = false
        this.hasEntered = false
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
                if (this.touched) { 
                    this.endTile = board.boardMatrix[7][14]
                } else {
                    this.endTile = this.determineEndtile(board, player.tile[0], player.tile[1])
                }
            } else if (ghostName === "Pinky") {
                if (this.touched) {
                    this.endTile = board.boardMatrix[7][14]
                } else {
                    this.endTile = this.determineEndtile(board, player.fourTilesAhead[0], player.fourTilesAhead[1])
                }
            } else if (ghostName === "Inky") {
                if (this.touched) {
                    this.endTile = board.boardMatrix[7][14]
                } else {
                    let inkyTargetCoord = Inky.determineTarget(Blinky, player, board)
                    this.endTile = this.determineEndtile(board, inkyTargetCoord[0], inkyTargetCoord[1])  
                }
            } else {
                if (this.touched) {
                    this.endTile = board.boardMatrix[7][14]
                } else {
                    this.endTile = this.determineEndtile(board, player.fourTilesAhead[0], player.fourTilesAhead[1])
                }
            }

            this.determine_neighbors(board.boardMatrix)
            this.aStarAlgorithm(board, beginTile, this.endTile, ghostName, ghostMode)
        } else {
            // console.log("Kees on the move " + ghostName)
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
        this.tile = [Math.floor((this.yPos - 200) / 20), Math.floor((this.xPos - 200) / 20)]
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

    becomeFrightened() {
        this.frightened = true
        this.phaseChange = true
        this.speed = 1
        this.color = "blue"
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
                while (Array.from(cameFrom.keys()).includes(current)) {
                    current = cameFrom.get(current)
                    curArr.push(current)
                }

                if (curArr.length <= 2 && this.mode === 'scatter') {
                    // switch locations of scatter mode depending on how close the ghost is to its target. 
                    if (this.homeTarget === this.home[0]) {
                        this.homeTarget = this.home[1]
                    } else {
                        this.homeTarget = this.home[0]
                    }
                
                }
                if (curArr.length <= 1) {
                    if (this.touched) {
                        this.xPos = 490
                        this.yPos = 350
                        return
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
                    if (this.phaseChange) {
                        this.nextTileCoord = this.prevTileCoord
                        this.phaseChange = false
                    } else {
                        this.prevTileCoord = this.nextTileCoord
                        this.nextTileCoord = [curArr[curArr.length - 2]!.xMiddle, curArr[curArr.length - 2]!.yMiddle]
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

                return
            }

            for (let neighbor of current.neighbors) {
                if (neighbor && neighbor.type !== "Wall" && neighbor.type !== "None" && neighbor !== this.preVisited) {
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
        if (ghostName === "Pinky" || this.frightened) {
            for (let neighbor of this.neighbors) {
                console.log(neighbor)
                if (neighbor.type !== "Wall"  && neighbor.type !== "None" && neighbor != this.preVisited) {
                    this.nextTileCoord = [neighbor.xMiddle, neighbor.yMiddle]
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