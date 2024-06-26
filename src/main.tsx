import Board from "./Board/board.tsx"
import Player from "./Player/player.tsx"
import Chaser from "./Ghosts/Blinky.tsx"
import Ambusher from "./Ghosts/Pinky.tsx"
import Whimsical from "./Ghosts/Inky.tsx"
import Clyde from "./Ghosts/Clyde.tsx"

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
let Blinky: Chaser
let Pinky: Ambusher
let Inky: Whimsical
let clyde: Clyde
let ghostActive: Array<any>
let time: number
let setClyde: boolean
let setInky: boolean

function init() {
    player = new Player()
    board = new Board()
    console.log(board.boardMatrix)
    Blinky = new Chaser(board)
    Pinky = new Ambusher(board)
    Inky = new Whimsical(board)
    clyde = new Clyde(board)
    ghostActive = [Blinky, Pinky, clyde, Inky]
    time = 0
    setClyde = false
    setInky = false
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
    player.updateDirection(keys, board)

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
    c!.fillStyle = 'black'
    c?.beginPath()
    c?.arc(player.xPos, player.yPos, player.radius, 0, 3*Math.PI / 2)
    // c?.arc(player.xPos, player.yPos, player.radius, -Math.PI / 2, Math.PI / 2) Half circle to the right
    // c?.arc(player.xPos, player.yPos, player.radius,  0, Math.PI)
    c?.fill()
    c!.fillStyle = 'purple'
    c?.fillRect(player.xPos, player.yPos, 1, 1)
}


function drawGhosts() {
    for (let ghost of ghostActive) {
        c!.fillStyle = ghost.color
        c?.beginPath()
        c?.arc(ghost.xPos, ghost.yPos, ghost.radius, 0, 2*Math.PI)
        c?.fill()
        ghost.move(board, player, ghost.name, ghost.mode, Inky, Blinky)
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
    time += 1
    draw()
    updatePlayer()
    if (time === 100) {
        Pinky.xPos = 490
        Pinky.yPos = 350
        Pinky.tile = [((Pinky.yPos - 210) / 20), ((Pinky.xPos - 210) / 20)]
    }
    if (player.score === 500 && !setClyde) {
        clyde.xPos = 490
        clyde.yPos = 350
        clyde.tile = [((clyde.yPos - 210) / 20), ((clyde.xPos - 210) / 20)]
        setClyde = true
    }

    if (player.score === 500 && !setInky) {
        Inky.xPos = 490
        Inky.yPos = 350
        Inky.tile = [((Inky.yPos - 210) / 20), ((Inky.xPos - 210) / 20)]
        setInky = true
    }

    window.requestAnimationFrame(loop)
}

function chaseToScatter() {
    Blinky.mode = "scatter"
    Pinky.mode = "scatter"
    clyde.mode = "scatter"
    Inky.mode = "scatter"
    
    setTimeout(scatterToChase, 7000); 
}

function scatterToChase() {
    Blinky.mode = "chase"
    Pinky.mode = "chase"
    Inky.mode = "chase"
    if (clyde.distanceTarget > 8) {
        clyde.mode = "chase"
    }
    

    setTimeout(chaseToScatter, 20000)
}

init()
setTimeout(chaseToScatter, 2000)
loop()