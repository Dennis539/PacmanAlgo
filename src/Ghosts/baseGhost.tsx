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
    neightbor: Array<any>
    localEnd: Array<number>
    preVisited: Array<number>
    tile: Array<number>
    constructor() {
        this.xMovement = 0
        this.yMovement = 0
        this.xPos = 590
        this.yPos = 500
        this.radius = 18
        this.speed = 1
        this.direction = "right"
        this.color = ""
        this.neightbor = []
        this.localEnd = [] //[X, Y]
        this.preVisited = []
        this.tile = [19,9]
    }

    movement(board: Board, player: Player) {
        if (board.middlePosTile.includes([this.xPos, this.yPos])) {
            let beginTile = board.boardMatrix[this.tile[0]][this.tile[1]]
            let endTile = board.boardMatrix[player.tile[0]][player.tile[1]]
            this.aStarAlgorithm(board, beginTile, endTile)
        } else {
            if (this.xPos < this.localEnd[0]) {
                this.xPos += this.speed
            } else if (this.xPos > this.localEnd[0]) {
                this.xPos -= this.speed
            } 
            if (this.yPos < this.localEnd[1]) {
                this.yPos += this.speed
            } else if (this.yPos > this.localEnd[1]) {
                this.yPos -= this.speed
            }
        }
    }

    determine_neightbors(grid: Array<Array<any>>) {
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                let node = grid[i][j]
                if (node) {
                    if (this.xPos >= node.xPos 
                        && this.xPos <= node.xPos + 19
                        && this.yPos >= node.yPos
                        && this.yPos <= node.yPos + 19
                    ) {
                        this.neightbor = node.neightbor
                        this.tile = node
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
        let distX: number = (start.xMiddle - end.xMiddle) * -1
        let distY: number = (start.yMiddle - end.yMiddle) * -1
        
        fScore.set(start, ((distX * distX) + (distY * distY)) ** 0.5)
        let openSetHash = new Set()
        openSetHash.add(start)

        while (!openSet.empty()) {
            let current:Tile = openSet.poll()![2]
            openSetHash.delete(current)

            if (current === end) {
                // pass
            }

            for (let neightbor of current.neightbors) {
                if (neightbor) {
                    let tempGScore = gScore.get(current) + 1

                    if (tempGScore < gScore.get(neightbor)) {
                        cameFrom.set(neightbor, current)
                        gScore.set(neightbor, tempGScore)

                        let distX: number = (neightbor.xMiddle- end.xMiddle) * -1
                        let distY: number = (neightbor.yMiddle - end.yMiddle) * -1
                        let distance = ((distX * distX) + (distY * distY)) ** 0.5
                        fScore.set(neightbor, tempGScore + distance)
                        
                        if (!openSetHash.has(neightbor)) {
                            
                        }
                    }
                }

            }
            

            
        }
    }
}

export default BaseGhost