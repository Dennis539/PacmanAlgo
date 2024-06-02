import Board from "./Board/board.tsx"
import Player from "./Player/player.tsx"
import Chaser from "./Ghosts/Blinky.tsx"
import Wall from "./Board/wall.tsx"
import Tile from "./Board/tile.tsx"

let canvas = document.querySelector('canvas')!
const c = canvas?.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

var keys: any = {}
window.addEventListener('keydown', function (e) {
    keys[e.key] = true
    e.preventDefault()
    
})
window.addEventListener('keyup', function (e) {
    delete keys[e.key]
})

let player: Player
let board: Board
let clyde: Chaser

function init() {
    player = new Player()
    board = new Board()
    console.log(board.middlePosTile)

    clyde = new Chaser()
    board.createBoard()
}

function drawBorder(xPos: number, yPos: number, width: number, height: number, thickness = 1) {
    c!.fillStyle='#000';
    c?.fillRect(xPos - (thickness), yPos - (thickness), width + (thickness * 2), height + (thickness * 2));
}


function drawBoard() {
    c!.fillStyle = 'white'

    c?.fillRect(board.xPos, board.yPos, board.width, board.height)
    for (let i = 0; i < board.boardMatrix.length; i++){
        for (let j = 0; j < board.boardMatrix[0].length; j++) {
            if (!board.boardMatrix[i][j]) {
                continue
            }
            if (board.boardMatrix[i][j].type === "Wall") {
                c?.beginPath()
                let wall = board.boardMatrix[i][j]
                if (wall.wallDir === "leftToRight") {
                    c?.moveTo(wall.xPos, wall.yPos + 10)
                    c?.lineTo(wall.xPos + 20, wall.yPos + 10)
                }
                else if (wall.wallDir === "upToBottom") {
                    c?.moveTo(wall.xPos + 10, wall.yPos)
                    c?.lineTo(wall.xPos + 10, wall.yPos + 20)
                }
                else if (wall.wallDir === "rightToBottom") {
                    c?.moveTo(wall.xPos + 20, wall.yPos + 10)
                    c?.arcTo(wall.xPos+10, wall.yPos+10, wall.xPos+10, wall.yPos+20, 10)
                }
                else if (wall.wallDir === "leftToBottom") {
                    c?.moveTo(wall.xPos, wall.yPos + 10)
                    c?.arcTo(wall.xPos+10, wall.yPos+10, wall.xPos+10, wall.yPos+20, 10)
                }
                else if (wall.wallDir === "rightToTop") {
                    c?.moveTo(wall.xPos + 20, wall.yPos + 10)
                    c?.arcTo(wall.xPos+10, wall.yPos+10, wall.xPos+10, wall.yPos, 10)
                }
                else if (wall.wallDir === "leftToTop") {
                    c?.moveTo(wall.xPos, wall.yPos + 10)
                    c?.arcTo(wall.xPos+10, wall.yPos+10, wall.xPos+10, wall.yPos, 10)
                }
                c?.stroke()
            } else if (board.boardMatrix[i][j].type === "Coin") {
                let coin = board.boardMatrix[i][j]
                c?.drawImage(coin.image, coin.xPos + 6, coin.yPos + 6, coin.width, coin.height)
                board.playerCoinCollision(player, coin)
            }
            c!.fillStyle = 'red'

            c?.fillRect(board.boardMatrix[i][j].xMiddle,board.boardMatrix[i][j].yMiddle,1,1)
        }
    }

}

function updatePlayer() {
    player.updateDirection(keys)

    // Check whether a future movement will cause a collision. 
    if (player.direction === "right") {
        var newX = player.xPos + player.speed
        var newY = player.yPos
    }
    else if (player.direction === "left") {
        var newX = player.xPos - player.speed
        var newY = player.yPos
    }
    else if (player.direction === "up") {
        var newX = player.xPos 
        var newY = player.yPos - player.speed
    }
    else {
        var newX = player.xPos
        var newY = player.yPos + player.speed
    }

    // If there is no collision, move the player
    if (!board.checkPlayerWallCollision(player, newX, newY)) {
        player.move(keys, board)
    }
}



function drawPlayer() {
    c!.fillStyle = 'yellow'
    c?.beginPath()
    c?.arc(player.xPos, player.yPos, player.radius, 0, 2*Math.PI)
    c?.fill()
    c!.fillStyle = 'purple'
    c?.fillRect(player.xPos, player.yPos,1,1)
}

function drawGhosts() {
    for (let ghost of [clyde]) {
        c!.fillStyle = ghost.color
        c?.beginPath()
        c?.arc(ghost.xPos, ghost.yPos, ghost.radius, 0, 2*Math.PI)
        c?.fill()
    }
}


function draw() {
    c?.clearRect(0, 0, canvas.width, canvas.height)
    c!.fillStyle = "black"
    c?.fillRect(0, 0, canvas.width, canvas.height)
    drawBoard()
    drawPlayer()
    drawGhosts()
}

function loop() {
    draw()
    updatePlayer()
    window.requestAnimationFrame(loop)

}

init()

loop()