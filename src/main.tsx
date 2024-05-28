import Board from "./Board/board.tsx"
import Player from "./Player/player.tsx"
import Wall from "./Board/wall.tsx"
import Coin from "./Board/Coin.tsx"

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

function init() {
    player = new Player()
    board = new Board()
    board.createBoard()
}

function drawBoard() {
    c!.fillStyle = 'white'

    c?.fillRect(board.xPos, board.yPos, board.width, board.height)
    for (let wall of board.walls) {
        c?.beginPath()
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
        // console.log("Kees")
        player.move(keys, canvas)

    }


}

function drawPlayer() {
    c!.fillStyle = 'yellow'
    c?.beginPath()
    c?.arc(player.xPos, player.yPos, player.radius, 0, 2*Math.PI)
    c?.fill()
}


function draw() {
    c?.clearRect(0, 0, canvas.width, canvas.height)
    c!.fillStyle = "black"
    c?.fillRect(0, 0, canvas.width, canvas.height)
    drawBoard()
    drawPlayer()
}

function loop() {
    draw()
    updatePlayer()
    window.requestAnimationFrame(loop)

}

init()
loop()