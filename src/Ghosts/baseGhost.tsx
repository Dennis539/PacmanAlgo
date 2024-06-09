import PriorityQueue from "priority-queue-typescript"
import Board from "../Board/board"
import Player from "../Player/player"
import Tile from "../Board/tile"

class BaseGhost {
    xPos: number
    yPos: number
    radius: number
    xMovement: number
    yMovement: number
    direction: string
    speed: number
    color: string
    neighbor: Array<any>
    newGoalTile: Array<number>
    preVisited: Tile
    tile: Array<number>
    constructor(board: Board) {
        this.xMovement = 0
        this.yMovement = 0
        this.xPos = 590
        this.yPos = 510
        this.radius = 18
        this.speed = 1
        this.direction = "right"
        this.color = ""
        this.neighbor = []
        this.newGoalTile = [] //[X, Y]
        this.preVisited = board.boardMatrix[0][0]
        this.tile = [((this.yPos-210)/20),((this.xPos-210)/20)]
    }

    move(board: Board, player: Player) {
        // aStar will only run when the ghost is on the middlepos. Otherwise, move closer to the middlepos.
        const checkMiddlePosTile = board.middlePosTile.some((middleArray) => middleArray[0] === this.xPos && middleArray[1] === this.yPos)

        if (checkMiddlePosTile) {
            let beginTile = board.boardMatrix[this.tile[0]][this.tile[1]]
            let endTile = board.boardMatrix[player.tile[0]][player.tile[1]]
            this.determine_neighbors(board.boardMatrix)
            this.aStarAlgorithm(board, beginTile, endTile)
        } else {
            console.log("Kees on the move")
            if (this.xPos < this.newGoalTile[0]) {
                this.xPos += this.speed
            } else if (this.xPos > this.newGoalTile[0]) {
                this.xPos -= this.speed
            } else if (this.yPos < this.newGoalTile[1]) {
                this.yPos += this.speed
            } else if (this.yPos > this.newGoalTile[1]) {
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
                        this.neighbor = node.neighbor
                    }
                }
            }
        }
    }

    aStarAlgorithm(board: Board, start: Tile, end: Tile) {
        let count = 0
        let openSet = new PriorityQueue<Array<any>>()
        openSet.add([0,count,start])
        let cameFrom = new Map()
        let gScore = new Map()
        let fScore = new Map()
        let grid = board.boardMatrix
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (!grid[i][j] || grid[i][j].type === "Wall") {
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
                this.newGoalTile = [curArr[curArr.length-2]!.xMiddle, curArr[curArr.length-2]!.yMiddle]

                if (this.xPos < this.newGoalTile[0]) {
                    this.xPos += this.speed
                } else if (this.xPos > this.newGoalTile[0]) {
                    this.xPos -= this.speed
                } else if (this.yPos < this.newGoalTile[1]) {
                    this.yPos += this.speed
                } else if (this.yPos > this.newGoalTile[1]) {
                    this.yPos -= this.speed
                }
                this.preVisited = board.boardMatrix[this.tile[0]][this.tile[1]]

                return
            }

            for (let neighbor of current.neighbors) {
                let sameAsPrev = neighbor.xMiddle === this.preVisited.xMiddle && neighbor.yMiddle === this.preVisited.yMiddle
                if (neighbor && neighbor.type !== "Wall" && neighbor !== this.preVisited) {
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
    }
}

export default BaseGhost