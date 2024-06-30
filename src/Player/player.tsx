import Board from "../Board/board"

class Player {
    xPos: number
    yPos: number
    radius: number
    direction: string
    speed: number
    score: number
    tile: Array<number>
    fourTilesAhead: Array<number>
    constructor() {
        this.xPos = 610
        this.yPos = 490
        this.radius = 18
        this.speed = 1
        this.direction = "up"
        this.score = 0
        this.tile = [Math.floor((this.yPos - 200) / 20), Math.floor((this.xPos - 200) / 20)] // Y and X index of the boardGrid. 
        this.fourTilesAhead = [Math.floor((this.yPos - 200) / 20)-4, Math.floor((this.xPos - 200) / 20)]
    }

    updateDirection(keys: any, board: Board) {
        let x = this.tile[1]
        let y = this.tile[0]
        // throw "Stop"
        if ("ArrowLeft" in keys) {
            this.direction = "left"
            if (x <= 4) {
                this.fourTilesAhead = this.findEligibleTile(board, y, 1)!
            } else if (
                board.boardMatrix[y][x-4] 
                && board.boardMatrix[y][x-4].type !== "Wall"
                && board.boardMatrix[y][x-4].type !== "None"
            ) {
                this.fourTilesAhead = this.findEligibleTile(board, y, x-4)!
            }
        } else if ("ArrowRight" in keys) {
            this.direction = "right"
            if (board.boardMatrix[0].length - 1 - x <= 4) {
                this.fourTilesAhead = this.findEligibleTile(board, y, board.boardMatrix[0].length - 2)!
            } else if (
                board.boardMatrix[y][x+4] 
                && board.boardMatrix[y][x+4].type !== "Wall"
                && board.boardMatrix[y][x+4].type !== "None"
            ) {
                this.fourTilesAhead = this.findEligibleTile(board, y, x+4)!
            }
        } else if ("ArrowUp" in keys) {
            this.direction = "up"
            if (y <= 4) {
                this.fourTilesAhead = this.findEligibleTile(board, 1, x)!
            } else if (
                board.boardMatrix[y-4][x] 
                && board.boardMatrix[y-4][x].type !== "Wall"
                && board.boardMatrix[y-4][x].type !== "None"
            ) {
                this.fourTilesAhead = this.findEligibleTile(board, y-4, x)!
            }
        } else if ("ArrowDown" in keys) {
            this.direction = "down"
            if (board.boardMatrix.length - 1 - y <= 4) {
                this.fourTilesAhead = this.findEligibleTile(board, board.boardMatrix.length - 2, x)!

            } else if (
                board.boardMatrix[y+4][x] 
                && board.boardMatrix[y+4][x].type !== "Wall"
                && board.boardMatrix[y+4][x].type !== "None"
            ) {
                this.fourTilesAhead = this.findEligibleTile(board, y+4, x)!
            }
        }
    }

    findEligibleTile(board: Board, y: number, x: number): Array<number> {
        let visited = [""]
        function dbfs(visited: Array<string>, y: number, x: number, board: Board):  Array<number> | undefined{
            let xRange = [...Array(board.boardMatrix[0].length).keys()]
            let yRange = [...Array(board.boardMatrix.length).keys()]
            if (
                !yRange.includes(y)
                || !xRange.includes(x)
                || visited.includes([y, x].toString())
            ) {
                return
            } else if (
                !board.boardMatrix[y][x]
                || board.boardMatrix[y][x].type === "Wall"
                || board.boardMatrix[y][x].type === "None"
            ) {
                if (!visited.includes([y, x].toString())) {
                    visited.push([y, x].toString())
                }
                console.log(visited)
                let newDir = [[y, x + 1], [y, x - 1], [y + 1, x], [y - 1, x]]
                for (let newDirArr of newDir) {
                    let res: Array<number> | undefined = dbfs(visited, newDirArr[0], newDirArr[1], board)
                    if (res) {
                        return [res[0],res[1]]
                    }
                }
            } else {
                return [y,x]
            }
        }
        return dbfs(visited, y, x, board)!
    }

    move(keys: any, board: Board) {
        if ("ArrowLeft" in keys) {
            this.xPos -= this.speed
        }
        else if ("ArrowRight" in keys) {
            this.xPos += this.speed

        }
        else if ("ArrowUp" in keys) {
            this.yPos -= this.speed

        }
        else if ("ArrowDown" in keys) {
            this.yPos += this.speed

        }
        this.tile = [Math.floor((this.yPos - 200) / 20), Math.floor((this.xPos - 200) / 20)]
        this.updateDirection(keys, board)
    }

}
export default Player