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
        if (wall.wallDir === "leftToRight") {
            c?.beginPath()
            c?.moveTo(wall.xPos, wall.yPos + 10)
            c?.lineTo(wall.xPos + 20, wall.yPos + 10)
        }
        else if (wall.wallDir === "upToBottom") {
            c?.beginPath()
            c?.moveTo(wall.xPos + 10, wall.yPos)
            c?.lineTo(wall.xPos + 10, wall.yPos + 20)
        }
        else if (wall.wallDir === "rightToBottom") {
            c?.beginPath();
            const radius = 10; // Arc radius
            const startAngle = Math.PI; // Starting point on circle
            const endAngle = Math.PI*1.5;; // End point on circle

            c?.arc(wall.xPos + 20, wall.yPos + 20, radius, startAngle, endAngle);
        }
        else if (wall.wallDir === "leftToBottom") {
            c?.beginPath();
            const radius = 10; // Arc radius
            const startAngle = Math.PI*1.5// Starting point on circle
            const endAngle = 0 // End point on circle

            c?.arc(wall.xPos, wall.yPos + 20, radius, startAngle, endAngle);
        }
        else if (wall.wallDir === "rightToTop") {
            c?.beginPath();
            const radius = 10; // Arc radius
            const startAngle = Math.PI*0.5; // Starting point on circle
            const endAngle = Math.PI;; // End point on circle

            c?.arc(wall.xPos + 20, wall.yPos, radius, startAngle, endAngle);
        }
        else if (wall.wallDir === "leftToTop") {
            c?.beginPath();
            const radius = 10; // Arc radius
            const startAngle = 0// Starting point on circle
            const endAngle = Math.PI*0.5 // End point on circle

            c?.arc(wall.xPos, wall.yPos, radius, startAngle, endAngle);
        }
        c?.stroke()

    }
            
    // for (let j = 0; j < boardArray.length; j++) {
    //     let boardUnit = boardArray[j]
    //     if (boardUnit) {
    //         if (boardUnit.type === "Wall") {
    //             typeof boardUnit === Wall

    //             if (boardUnit.wallDir)
    //             // c!.fillStyle = 'green'
    //             // c?.fillRect(boardUnit.xPos, boardUnit.yPos, boardUnit.width, boardUnit.height)
    //         }
    //         else if (boardUnit.type === "Coin") {
    //             c!.fillStyle = 'yellow'
    //             c?.fillRect(boardUnit.xPos, boardUnit.yPos, boardUnit.width, boardUnit.height)
    //         }


    //     }
    // }
    // console.log(board.boardMatrix)
}

function drawPlayer() {
    c!.fillStyle = 'yellow'
    c?.beginPath()
    c?.arc(player.xPos, player.yPos, player.radius, 0, 2*Math.PI)
    c?.fill()
    player.move(keys, canvas)
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
    window.requestAnimationFrame(loop)

}

init()
loop()