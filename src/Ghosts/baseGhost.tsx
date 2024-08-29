import PriorityQueue from 'priority-queue-typescript'
import Board from '../Board/board'
import Player from '../Player/player'
import Tile from '../Board/tile'
import Whimsical from './Inky'
import Chaser from './Blinky'

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
    name: 'Blinky' | 'Pinky' | 'Inky' | 'Clyde'
    endTile: Tile
    frightened: boolean
    beginTimeMode: number
    endTimeMode: number
    beginTimeFrightened: number
    endTimeFrightened: number
    phaseChange: boolean
    touched: boolean
    hasEntered: boolean
    algorithm: 'aStar' | 'dfs' | 'bfs'
    constructor(board: Board) {
        this.xPos = 590
        this.yPos = 510
        this.radius = 18
        this.speed = 2
        this.direction = 'right'
        this.color = ''
        this.neighbors = []
        this.nextTileCoord = [] //[X, Y]
        this.prevTileCoord = []
        this.preVisited = board.boardMatrix[0][0]
        this.tile = [(this.yPos - 210) / 20, (this.xPos - 210) / 20]
        this.mode = 'chase'
        this.home = [board.boardMatrix[0][0], board.boardMatrix[0][0]]
        this.homeTarget = board.boardMatrix[0][0]
        this.name = 'Blinky'
        this.endTile = board.boardMatrix[0][0]
        this.frightened = false
        this.beginTimeMode = Math.floor(Date.now() / 1000)
        this.endTimeMode = Math.floor(Date.now() / 1000)
        this.beginTimeFrightened = 0
        this.endTimeFrightened = 0
        this.phaseChange = false
        this.touched = false
        this.hasEntered = false
        this.algorithm = 'bfs'
    }

    _determineEndtile(board: Board, endTileY: number, endTileX: number) {
        let endTile: Tile
        if (this.mode === 'chase') {
            endTile = board.boardMatrix[endTileY][endTileX]
        } else if (this.mode === 'scatter') {
            endTile = this.homeTarget
        } else {
            endTile = board.boardMatrix[endTileY][endTileX]
        }
        return endTile
    }
    _moveToCenterOfTile() {
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

    _determine_neighbors(grid: Array<Array<any>>) {
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                let node = grid[i][j]
                if (node) {
                    if (
                        this.xPos >= node.xPos &&
                        this.xPos <= node.xPos + 19 &&
                        this.yPos >= node.yPos &&
                        this.yPos <= node.yPos + 19
                    ) {
                        this.neighbors = node.neighbors
                    }
                }
            }
        }
    }

    _assignRandomNextTileCoord() {
        for (let neighbor of this.neighbors) {
            if (
                neighbor.type !== 'Wall' &&
                neighbor.type !== 'None' &&
                neighbor != this.preVisited
            ) {
                return [neighbor.xMiddle, neighbor.yMiddle]
            }
        }
        return [210, 210]
    }

    _determineErrorSpot(
        ghostName: 'Blinky' | 'Pinky' | 'Inky' | 'Clyde',
        curArr: Array<any>,
        ghostMode: string
    ) {
        return (
            (ghostName === 'Pinky' &&
                curArr.length <= 2 &&
                ghostMode !== 'scatter') ||
            (ghostName === 'Inky' &&
                curArr.length <= 2 &&
                ghostMode !== 'scatter') ||
            (ghostName === 'Clyde' &&
                curArr.length <= 8 &&
                ghostMode !== 'scatter')
        )
    }

    _determineNextTilePos(
        curArr: Array<Tile>,
        ghostName: 'Blinky' | 'Pinky' | 'Inky' | 'Clyde',
        ghostMode: string,
        board: Board
    ): void {
        if (curArr.length <= 1 && this.touched) {
            this.xPos = 490
            this.yPos = 350
            return
        }

        if (curArr.length <= 2 && this.mode === 'scatter') {
            // switch locations of scatter mode depending on how close the ghost is to its target.
            if (this.homeTarget === this.home[0]) {
                this.homeTarget = this.home[1]
            } else {
                this.homeTarget = this.home[0]
            }
        }

        if (this._determineErrorSpot(ghostName, curArr, ghostMode)) {
            this.nextTileCoord = this._assignRandomNextTileCoord()
            if (ghostName === 'Clyde') {
                this.mode = 'scatter'
            }
        } else {
            this.prevTileCoord = this.nextTileCoord
            if (this.algorithm === 'aStar') {
                this.nextTileCoord = [
                    curArr[curArr.length - 2]!.xMiddle,
                    curArr[curArr.length - 2]!.yMiddle
                ]
            } else {
                console.log(curArr)
                this.nextTileCoord = [
                    curArr[curArr.length - 1]!.xMiddle,
                    curArr[curArr.length - 1]!.yMiddle
                ]
            }
        }

        this.preVisited = board.boardMatrix[this.tile[0]][this.tile[1]]
        this._moveToCenterOfTile()
    }

    _dfs(
        visited: Array<string>,
        xCoord: number,
        yCoord: number,
        board: Board
    ): Array<Tile> | undefined {
        // if endcoordinates match, return an array with another array containing y and x
        // on other parts of the code, return the dfs function with an array appended to it.
        let yEndCoord = (this.endTile.yMiddle - 210) / 20
        let xEndCoord = (this.endTile.xMiddle - 210) / 20
        if ([yCoord, xCoord].toString() === [yEndCoord, xEndCoord].toString()) {
            console.log('found Kees')
            return [board.boardMatrix[yCoord][xCoord]]
        }
        let xRange = [...Array(board.boardMatrix[0].length).keys()]
        let yRange = [...Array(board.boardMatrix.length).keys()]
        if (
            !yRange.includes(yCoord) ||
            !xRange.includes(xCoord) ||
            visited.includes([yCoord, xCoord].toString()) ||
            board.boardMatrix[yCoord][xCoord].type === 'Wall' ||
            board.boardMatrix[yCoord][xCoord] === this.preVisited
        ) {
            return
        }
        visited.push([yCoord, xCoord].toString())

        let newCoords = [
            [xCoord - 1, yCoord],
            [xCoord + 1, yCoord],
            [xCoord, yCoord - 1],
            [xCoord, yCoord + 1]
        ]

        for (let coords of newCoords) {
            let x = coords[0]
            let y = coords[1]
            let res = this._dfs(visited, x, y, board)
            if (res) {
                res.push(board.boardMatrix[y][x])
                return res
            }
        }
    }

    _bfs(
        start: Tile,
        end: Tile,
        board: Board,
        ghostName: 'Blinky' | 'Pinky' | 'Inky' | 'Clyde',
        ghostMode: string
    ) {
        let yEndCoord = (end.yMiddle - 210) / 20
        let xEndCoord = (end.xMiddle - 210) / 20
        let cameFrom = new Map()
        let visited: Array<string> = []
        let openSet: Array<any> = []
        let curArr: Array<Tile> = []
        let endTile = [
            Math.floor((end.yPos - 200) / 20),
            Math.floor((end.xPos - 200) / 20)
        ]
        openSet.push(start) // the node itself and the pointer towards the previous node
        while (openSet.length !== 0) {
            let copyOpenSet = openSet

            for (let i of copyOpenSet) {
                let current: Tile = openSet.shift()
                let curTile = [
                    Math.floor((current.yPos - 200) / 20),
                    Math.floor((current.xPos - 200) / 20)
                ]
                if (curTile.toString() === endTile.toString()) {
                    while (Array.from(cameFrom.keys()).includes(current)) {
                        current = cameFrom.get(current)
                        curArr.push(current)
                    }
                    this._determineNextTilePos(
                        curArr,
                        ghostName,
                        ghostMode,
                        board
                    )
                    console.log('Found Kees')
                    return
                }
                console.log(current)

                let newCoords = [
                    [curTile[0] - 1, curTile[1]],
                    [curTile[0] + 1, curTile[1]],
                    [curTile[0], curTile[1] - 1],
                    [curTile[0], curTile[1] + 1]
                ]
                let xRange = [...Array(board.boardMatrix[0].length).keys()]
                let yRange = [...Array(board.boardMatrix.length).keys()]
                for (let newCoord of newCoords) {
                    let yCoord = newCoord[0]
                    let xCoord = newCoord[1]
                    let nextTile = board.boardMatrix[yCoord][xCoord]
                    if (
                        yRange.includes(yCoord) &&
                        xRange.includes(xCoord) &&
                        !visited.includes([yCoord, xCoord].toString()) &&
                        board.boardMatrix[yCoord][xCoord].type !== 'Wall' &&
                        board.boardMatrix[yCoord][xCoord] !== this.preVisited
                    ) {
                        openSet.push(board.boardMatrix[yCoord][xCoord])
                        cameFrom.set(nextTile, current)
                    }
                }
                visited.push(curTile.toString())
            }
        }
    }

    _dfsAlgorithm(
        board: Board,
        ghostName: 'Blinky' | 'Pinky' | 'Inky' | 'Clyde',
        ghostMode: string
    ) {
        let dfsArr = this._dfs([], this.tile[1], this.tile[0], board)
        console.log(dfsArr)
        if (dfsArr) {
            this._determineNextTilePos(dfsArr, ghostName, ghostMode, board)
        }
    }

    _aStarAlgorithm(
        board: Board,
        start: Tile,
        end: Tile,
        ghostName: 'Blinky' | 'Pinky' | 'Inky' | 'Clyde',
        ghostMode: string
    ) {
        let count = 0
        let openSet = new PriorityQueue<Array<any>>()
        openSet.add([0, count, start])
        let cameFrom = new Map()
        let gScore = new Map()
        let fScore = new Map()
        let grid = board.boardMatrix

        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (
                    !grid[i][j] ||
                    grid[i][j].type === 'Wall' ||
                    grid[i][j].type === 'None'
                ) {
                    continue
                }
                let spot: Tile = grid[i][j]
                gScore.set(spot, Infinity)
                fScore.set(spot, Infinity)
            }
        }
        gScore.set(start, 0)
        let distX: number = Math.abs(start.xMiddle - end.xMiddle)
        let distY: number = Math.abs(start.yMiddle - end.yMiddle)

        fScore.set(start, Math.sqrt(distX * distX + distY * distY))
        let openSetHash = new Set()
        openSetHash.add(start)

        while (!openSet.empty()) {
            let current: Tile = openSet.poll()![2]
            openSetHash.delete(current)
            let curArr: Array<Tile> = []

            if (current === end) {
                while (Array.from(cameFrom.keys()).includes(current)) {
                    current = cameFrom.get(current)
                    curArr.push(current)
                }
                this._determineNextTilePos(curArr, ghostName, ghostMode, board)
                return
            }

            for (let neighbor of current.neighbors) {
                if (
                    neighbor &&
                    neighbor.type !== 'Wall' &&
                    neighbor.type !== 'None' &&
                    neighbor !== this.preVisited
                ) {
                    let tempGScore = gScore.get(current) + 1

                    if (tempGScore < gScore.get(neighbor)) {
                        cameFrom.set(neighbor, current)
                        gScore.set(neighbor, tempGScore)
                        let distX: number = Math.abs(
                            neighbor.xMiddle - end.xMiddle
                        )
                        let distY: number = Math.abs(
                            neighbor.yMiddle - end.yMiddle
                        )
                        let distance = Math.sqrt(distX * distX + distY * distY)
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
        if (ghostName === 'Pinky' || this.frightened) {
            this.nextTileCoord = this._assignRandomNextTileCoord()
        }
        this.preVisited = board.boardMatrix[this.tile[0]][this.tile[1]]
        this._moveToCenterOfTile()
    }

    move(
        board: Board,
        player: Player,
        ghostName: 'Blinky' | 'Pinky' | 'Inky' | 'Clyde',
        ghostMode: string,
        Inky: Whimsical,
        Blinky: Chaser
    ) {
        // algorithm will only run when the ghost is on the middlepos. Otherwise, move closer to the middlepos.
        const checkMiddlePosTile = board.middlePosTile.some(
            (middleArray) =>
                middleArray[0] === this.xPos && middleArray[1] === this.yPos
        )
        if (checkMiddlePosTile) {
            let beginTile = board.boardMatrix[this.tile[0]][this.tile[1]]
            let endTileX: number
            let endTileY: number
            if (this.touched) {
                this.endTile = board.boardMatrix[7][14]
            } else {
                if (ghostName === 'Blinky') {
                    endTileX = player.tile[1]
                    endTileY = player.tile[0]
                } else if (ghostName === 'Pinky') {
                    endTileX = player.fourTilesAhead[1]
                    endTileY = player.fourTilesAhead[0]
                } else if (ghostName === 'Inky') {
                    let inkyTargetCoord = Inky.determineTarget(
                        Blinky,
                        player,
                        board
                    )
                    endTileX = inkyTargetCoord[1]
                    endTileY = inkyTargetCoord[0]
                } else {
                    endTileX = player.fourTilesAhead[1]
                    endTileY = player.fourTilesAhead[0]
                }
                this.endTile = this._determineEndtile(board, endTileY, endTileX)
            }

            let playerGhostDistX: number = player.xPos - this.xPos
            let playerGhostDistY: number = player.yPos - this.yPos
            let playerGhostDist: number = Math.sqrt(
                playerGhostDistX * playerGhostDistX +
                    playerGhostDistY * playerGhostDistY
            )
            if (this.touched && playerGhostDist < this.radius + player.radius) {
                this.preVisited =
                    board.boardMatrix[player.tile[0]][player.tile[1]]
            }
            if (this.phaseChange) {
                this.nextTileCoord = this.prevTileCoord
                this.phaseChange = false
                this.preVisited = board.boardMatrix[this.tile[0]][this.tile[1]]
                this._moveToCenterOfTile()
                return
            }
            this._determine_neighbors(board.boardMatrix)
            if (this.algorithm === 'aStar') {
                this._aStarAlgorithm(
                    board,
                    beginTile,
                    this.endTile,
                    ghostName,
                    ghostMode
                )
            } else if (this.algorithm === 'dfs') {
                this._dfsAlgorithm(board, ghostName, ghostMode)
                console.log('Executed')
            } else if (this.algorithm === 'bfs') {
                this._bfs(beginTile, this.endTile, board, ghostName, ghostMode)
                console.log('Executed BFS')
            }
        } else {
            this._moveToCenterOfTile()
        }
        this.tile = [
            Math.floor((this.yPos - 200) / 20),
            Math.floor((this.xPos - 200) / 20)
        ]
    }

    becomeFrightened() {
        this.frightened = true
        this.phaseChange = true
        this.speed = 1
        this.color = 'blue'
    }
}

export default BaseGhost
