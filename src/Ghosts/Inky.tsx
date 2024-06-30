import BaseGhost from "./baseGhost";
import Board from "../Board/board";
import Chaser from "./Blinky";
import Player from "../Player/player";


class Whimsical extends BaseGhost {
    constructor(board: Board) {
        super(board)
        this.xPos = 570
        this.yPos = 370
        this.color = "blue"
        this.tile = [((this.yPos - 210) / 20), ((this.xPos - 210) / 20)]
        let y1 = board.boardMatrix.length-2
        let y2 = board.boardMatrix.length - 2
        let x1 = board.boardMatrix[y1].length -2
        let x2 = board.boardMatrix[y1].length -10
        this.home = [board.boardMatrix[y1][x1], board.boardMatrix[y2][x2]]
        this.homeTarget = board.boardMatrix[y1][x1]
        this.name = "Inky"
    }

    determineTarget(blinky: Chaser, player: Player, board: Board) {
        // Should be two tiles ahead but didn't bother creating another function for that
        let xDiff = player.fourTilesAhead[1] - Math.floor(blinky.tile[1]) 
        let yDiff = player.fourTilesAhead[0] - Math.floor(blinky.tile[0])
        console.log(blinky.tile, player.fourTilesAhead)
        let boardLen = board.boardMatrix.length
        let boardWidth = board.boardMatrix[0].length

        let xTarget
        let yTarget
        // positive difference means player is under Blinky
        if (yDiff >= 0) {
            if (player.fourTilesAhead[0] + yDiff > boardLen - 2) {
                yTarget = boardLen - 2
            } else {
                yTarget = player.fourTilesAhead[0] + yDiff
            }
        } else { // Player is above Blinky
            if (player.fourTilesAhead[0] + yDiff < 1) {
                yTarget = 1
            } else {
                yTarget = player.fourTilesAhead[0] + yDiff
            }
        }

        if (xDiff >= 0) { // Player is right of Blinky
            if (player.fourTilesAhead[1] + xDiff > boardWidth - 2) {
                xTarget = boardWidth - 2
            } else {
                xTarget = player.fourTilesAhead[1] + xDiff
            }
        } else {
            if (player.fourTilesAhead[1] + xDiff < 1) {
                xTarget = 1
            } else {
                xTarget = player.fourTilesAhead[1] + xDiff
            }
        }

        console.log(yTarget, xTarget)
        console.log(xDiff, yDiff)

        // After that, check whether the tile coordinates actually give a valid Tile
        return player.findEligibleTile(board, yTarget, xTarget)
    }

}

export default Whimsical