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
let durationChase: number
let durationScatter: number
let durationFrightened: number

function init() {
    durationChase = 20
    durationScatter = 7
    durationFrightened = 3
    player = new Player()
    board = new Board(durationChase, durationScatter, durationFrightened)
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
            } else if (board.boardMatrix[i][j].type === "PowerUpCoin") {
                let powerUpCoin = board.boardMatrix[i][j]
                powerUpCoin.updateLightness()
                c!.fillStyle = `hsl(62,100%,${powerUpCoin.lightness}%)`;  // saturation at 100%

                c!.beginPath();
                c!.moveTo(player.xPos, player.yPos);
                c!.arc(powerUpCoin.xPos + 10, powerUpCoin.yPos+10, 10, 0, 90, false);
                c!.lineTo(player.xPos, player.yPos);
                c!.fill();
                let collisionType = board.playerCoinCollision(player, powerUpCoin)
                if (collisionType && collisionType === "PowerUpCoin") {
                    for (let ghost of ghostActive) {
                        ghost.becomeFrightened()
                        ghost.beginTimeFrightened = Math.floor(Date.now()/1000)
                        ghost.endTimeFrightened = Math.floor(Date.now()/1000)
                    }
                }
            }
            c!.fillStyle = 'red'

            c?.fillRect(board.boardMatrix[i][j].xMiddle,board.boardMatrix[i][j].yMiddle,1,1)
        }
    }

}

function updatePlayer() {
    player.updateDirection(c, keys, board)

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
        player.move(keys, board, c)
    }
}

let direction = "Open"
function drawPlayer() {


    // Draw the circle
    c!.beginPath();
    c!.moveTo(player.xPos, player.yPos);
    c!.arc(player.xPos, player.yPos, player.radius, player.startAngle, player.endAngle, false);
    c!.lineTo(player.xPos, player.yPos);
    c!.fillStyle = 'yellow'
    c!.fill();
    if (Object.keys(keys).length !== 0) {
        if (direction === "Open") {
            player.endAngle -= 0.04
            player.startAngle += 0.04
        }
        else {
            player.endAngle += 0.04
            player.startAngle -= 0.04
        }
    }


    if (Math.abs(player.startAngle - player.endAngle) > 2.5) {
        direction = "Close"
    } else if (Math.abs(player.startAngle - player.endAngle) < 0.10) {
        direction = "Open"
    }
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

function updateGhostMode() {
    for (let ghost of ghostActive) {
        if (!ghost.frightened) {
            if (ghost.mode === "chase") {
                if (ghost.endTimeMode - ghost.beginTimeMode > board.chaseTimeOut) {
                    ghost.mode = "scatter"
                    ghost.beginTimeMode = Math.floor(Date.now() / 1000)
                    ghost.endTimeMode = Math.floor(Date.now()/1000)

                } else {
                    ghost.endTimeMode = Math.floor(Date.now()/1000)
                }
            } else if (ghost.mode === "scatter") {
                if (ghost.endTimeMode - ghost.beginTimeMode > board.scatterTimeOut) {
                    ghost.mode = "chase"
                    ghost.beginTimeMode = Math.floor(Date.now() / 1000)
                    ghost.endTimeMode = Math.floor(Date.now()/1000)

                } else {
                    ghost.endTimeMode = Math.floor(Date.now()/1000)
                }
            }
        } else {
            let correctGhostPos = ghost.xPos % 2 === 0 && ghost.yPos % 2 === 0
            if ((ghost.endTimeFrightened - ghost.beginTimeFrightened > board.frightenedTimeOut) && correctGhostPos) {
                ghost.frightened = false
                if (ghost.name === "Blinky") {
                    ghost.color = "red"                    
                }
                if (ghost.name === "Pinky") {
                    ghost.color = "pink"
                }
                if (ghost.name === "Inky") {
                    ghost.color = "lightblue"
                }
                if (ghost.name === "Clyde") {
                    ghost.color = "orange"
                }
                ghost.speed = 2
            } else {
                ghost.endTimeFrightened = Math.floor(Date.now()/1000)
            }
        }
    }
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
    updateGhostMode()
    window.requestAnimationFrame(loop)
}


init()
loop()