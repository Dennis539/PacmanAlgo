import BaseGhost from "./Ghosts/baseGhost.tsx"
import Board from "./Board/board.tsx"
import Player from "./Player/player.tsx"
import Chaser from "./Ghosts/Blinky.tsx"
import Ambusher from "./Ghosts/Pinky.tsx"
import Whimsical from "./Ghosts/Inky.tsx"
import Clyde from "./Ghosts/Clyde.tsx"
import Button from "./Button/Button.tsx"

let canvas = document.querySelector("canvas")!
const algorithmDropdown = document.getElementById("algorithmDropdown")
const showAlgorithmPathDiv = document.getElementById("showAlgorithmPathDiv")
let StartModelEl = document.getElementById("StartModelEl")!

const c = canvas?.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight

function updateAlgorithm(evt: any) {
    for (let ghost of ghostActive) {
        ghost.algorithm = evt.target.value
    }
}

function updateShowAlgorithm() {
    for (let ghost of ghostActive) {
        ghost.showAlgorithm = !ghost.showAlgorithm
    }
}
algorithmDropdown!.addEventListener("change", updateAlgorithm)
showAlgorithmPathDiv!.addEventListener("change", updateShowAlgorithm)

var keys: any = {}
window.addEventListener("keydown", function (e) {
    keys[e.key] = true
    e.preventDefault()
})
window.addEventListener("keyup", function (e) {
    delete keys[e.key]
})

function createGameOverButtons() {
    let buttons: Button[] = []

    let restartButton = new Button("Restart Game", "#eeaa00", "black")
    let endGameButton = new Button("Back to main", "#eeaa00", "black")
    restartButton.setPosition(canvas.width / 2 - 200, canvas.height / 2)
    endGameButton.setPosition(canvas.width / 2 + 50, canvas.height / 2)
    endGameButton.onClick = () => {
        document.location.reload()
    }
    restartButton.onClick = () => {
        init()
        // loop()
        canvas.removeEventListener("click", eventListenerGameOverButtons)
    }
    buttons.push(restartButton)
    buttons.push(endGameButton)
    buttons.forEach((button) => button.setSize(150, 75))
    return buttons
}

let player: Player
let board: Board
let Blinky: Chaser
let Pinky: Ambusher
let Inky: Whimsical
let clyde: Clyde
let ghostActive: Array<BaseGhost>
let durationChase: number
let durationScatter: number
let durationFrightened: number
let GameOverButtons = createGameOverButtons()

function init() {
    durationChase = 20
    durationScatter = 7
    durationFrightened = 10
    player = new Player(0, 0)
    board = new Board(durationChase, durationScatter, durationFrightened)
    Blinky = new Chaser(board)
    Pinky = new Ambusher(board)
    Inky = new Whimsical(board)
    clyde = new Clyde(board)
    ghostActive = [Blinky, Pinky, clyde, Inky]
    board.time = 0
}

function resetBoard() {
    let copyPlayer = player
    player = new Player(copyPlayer.lives, copyPlayer.score)

    Blinky.xPos = 490
    Blinky.yPos = 350

    clyde.xPos = 570
    clyde.yPos = 330

    Inky.xPos = 570
    Inky.yPos = 370

    Pinky.xPos = 530
    Pinky.yPos = 350

    board.lifeLost = false
    board.gameOverScreen = false

    for (let ghost of ghostActive) {
        ghost.touched = false
        ghost.frightened = false
        ghost.tile = [
            Math.floor((ghost.yPos - 200) / 20),
            Math.floor((ghost.xPos - 200) / 20)
        ]
        if (ghost.name !== "Blinky") {
            ghost.hasEntered = false
        }
        console.log(ghost)
    }
    board.time = 1
}

function drawBoard() {
    c!.fillStyle = "black"

    c?.fillRect(board.xPos, board.yPos, board.width, board.height)
    for (let i = 0; i < board.boardMatrix.length; i++) {
        for (let j = 0; j < board.boardMatrix[0].length; j++) {
            if (!board.boardMatrix[i][j]) {
                continue
            }
            if (board.boardMatrix[i][j].type === "Coin") {
                c!.fillStyle = board.boardMatrix[i][j].color
            }
            if (board.boardMatrix[i][j].type === "Wall") {
                c!.strokeStyle = board.boardMatrix[i][j].color
                c!.lineWidth = 2
                c?.beginPath()
                let wall = board.boardMatrix[i][j]
                if (wall.wallDir === "leftToRight") {
                    c?.moveTo(wall.xPos, wall.yPos + 10)
                    c?.lineTo(wall.xPos + 20, wall.yPos + 10)
                } else if (wall.wallDir === "upToBottom") {
                    c?.moveTo(wall.xPos + 10, wall.yPos)
                    c?.lineTo(wall.xPos + 10, wall.yPos + 20)
                } else if (wall.wallDir === "rightToBottom") {
                    c?.moveTo(wall.xPos + 20, wall.yPos + 10)
                    c?.arcTo(
                        wall.xPos + 10,
                        wall.yPos + 10,
                        wall.xPos + 10,
                        wall.yPos + 20,
                        10
                    )
                } else if (wall.wallDir === "leftToBottom") {
                    c?.moveTo(wall.xPos, wall.yPos + 10)
                    c?.arcTo(
                        wall.xPos + 10,
                        wall.yPos + 10,
                        wall.xPos + 10,
                        wall.yPos + 20,
                        10
                    )
                } else if (wall.wallDir === "rightToTop") {
                    c?.moveTo(wall.xPos + 20, wall.yPos + 10)
                    c?.arcTo(
                        wall.xPos + 10,
                        wall.yPos + 10,
                        wall.xPos + 10,
                        wall.yPos,
                        10
                    )
                } else if (wall.wallDir === "leftToTop") {
                    c?.moveTo(wall.xPos, wall.yPos + 10)
                    c?.arcTo(
                        wall.xPos + 10,
                        wall.yPos + 10,
                        wall.xPos + 10,
                        wall.yPos,
                        10
                    )
                }
                c?.stroke()
            } else if (board.boardMatrix[i][j].type === "Coin") {
                let coin = board.boardMatrix[i][j]
                c!.fillStyle = "orange"
                c!.beginPath()
                c!.moveTo(player.xPos, player.yPos)
                c!.arc(coin.xPos + 10, coin.yPos + 10, 2, 0, 90, false)
                c!.lineTo(player.xPos, player.yPos)
                c!.fill()

                board.playerCoinCollision(player, coin)
            } else if (board.boardMatrix[i][j].type === "PowerUpCoin") {
                let powerUpCoin = board.boardMatrix[i][j]
                powerUpCoin.updateLightness()
                c!.fillStyle = `hsl(62,100%,${powerUpCoin.lightness}%)` // saturation at 100%

                c!.beginPath()
                c!.moveTo(player.xPos, player.yPos)
                c!.arc(
                    powerUpCoin.xPos + 10,
                    powerUpCoin.yPos + 10,
                    10,
                    0,
                    90,
                    false
                )
                c!.lineTo(player.xPos, player.yPos)
                c!.fill()
                let collisionType = board.playerCoinCollision(
                    player,
                    powerUpCoin
                )
                if (collisionType && collisionType === "PowerUpCoin") {
                    for (let ghost of ghostActive) {
                        ghost.becomeFrightened()
                        ghost.beginTimeFrightened = Math.floor(
                            Date.now() / 1000
                        )
                        ghost.endTimeFrightened = Math.floor(Date.now() / 1000)
                    }
                }
            }
            c!.fillStyle = "red"
        }
    }
    let xLives = 220
    let yLives = 570
    c!.fillStyle = "yellow"
    for (let i = 0; i < player.lives; i++) {
        c!.beginPath()
        c!.moveTo(xLives, yLives)
        let startAngle = Math.PI + 0.55
        let endAngle = Math.PI - 0.55
        c!.arc(xLives, yLives, 10, startAngle, endAngle, false)
        c!.lineTo(xLives, yLives)
        c!.fill()
        xLives += 30
    }
}

const eventListenerGameOverButtons = (event: MouseEvent) => {
    let x = event.pageX - (canvas.clientLeft + canvas.offsetLeft)
    let y = event.pageY - (canvas.clientTop + canvas.offsetTop)

    GameOverButtons.forEach((b) => {
        if (b.inBounds(x, y) && !!b.onClick) b.onClick()
    })
}

function drawGameOverScreen(GameOverButtons: Array<Button>, board: Board) {
    c!.fillStyle = "#808080"
    c!.beginPath()
    c?.roundRect(
        canvas.width / 3,
        canvas.height / 3,
        canvas.width / 3,
        canvas.height / 3,
        50
    )
    c!.fill()
    c!.font = "20px Courier New"
    c!.textAlign = "center"
    c!.strokeStyle = "white"

    c!.strokeText("Oh he dead", canvas.width / 2, canvas.height / 2 - 80)
    if (!board.gameOverScreen) {
        canvas.addEventListener("click", eventListenerGameOverButtons)
        board.gameOverScreen = true
    }

    GameOverButtons.forEach((button) => button.draw(c!))
}

function updatePlayer() {
    if (board.lifeLost) {
        if (
            Math.abs(player.startAngle - player.endAngle) <=
            Math.PI * 2 - 0.155
        ) {
            // Checks whether the circle is closed
            player.caught()
        } else {
            player.dead = true
            if (!player.explosion) {
                player.explosion = player.createExplosion(player)
            }
            player.explosion.forEach((particle, i) => {
                if (particle.alpha <= 0) {
                    player.explosion!.splice(i, 1)
                } else {
                    particle.update(c)
                }
            })
        }
        if (player.explosion && player.explosion.length === 0) {
            if (player.lives > 0) {
                player.lives -= 1
                resetBoard()
            } else {
                drawGameOverScreen(GameOverButtons, board)
            }
        }
    } else {
        player.updateDirection(keys, board)

        // Check whether a future movement will cause a collision.
        if (player.direction === "right") {
            var newX = player.xPos + player.speed
            var newY = player.yPos
        } else if (player.direction === "left") {
            var newX = player.xPos - player.speed
            var newY = player.yPos
        } else if (player.direction === "up") {
            var newX = player.xPos
            var newY = player.yPos - player.speed
        } else {
            var newX = player.xPos
            var newY = player.yPos + player.speed
        }

        // If there is no collision, move the player
        if (!board.checkPlayerWallCollision(player, newX, newY)) {
            player.move(keys, board)
        }
    }
}

function drawPlayer() {
    if (!player.dead) {
        c!.beginPath()
        c!.moveTo(player.xPos, player.yPos)
        c!.arc(
            player.xPos,
            player.yPos,
            player.radius,
            player.startAngle,
            player.endAngle,
            false
        )
        c!.lineTo(player.xPos, player.yPos)
        c!.fillStyle = "yellow"
        c!.fill()
        if (Object.keys(keys).length !== 0) {
            if (player.mouthDirection === "Open") {
                player.startAngle += 0.08
                player.endAngle -= 0.08
            } else {
                player.startAngle -= 0.08
                player.endAngle += 0.08
            }
        }
        if (Math.abs(player.startAngle - player.endAngle) > 2.5) {
            player.mouthDirection = "Close"
        } else if (Math.abs(player.startAngle - player.endAngle) < 0.17) {
            player.mouthDirection = "Open"
        }
    }
}

function drawGhosts() {
    for (let ghost of ghostActive) {
        c!.fillStyle = ghost.color
        c?.beginPath()
        c?.arc(ghost.xPos, ghost.yPos, ghost.radius, 0, 2 * Math.PI)
        c?.fill()
        if (ghost.hasEntered) {
            ghost.move(board, player, ghost.name, ghost.mode, Inky, Blinky)
            if (ghost.showAlgorithm && ghost.name === "Pinky") {
                ghost.showAlgorithmStep.map((tile) =>
                    c!.fillRect(tile.xPos + 5, tile.yPos + 5, 10, 10)
                )
                c!.fillStyle = "green"
                let ghostEndX = ghost.endTile.xPos
                let ghostEndY = ghost.endTile.yPos
                c!.fillRect(ghostEndX + 5, ghostEndY + 5, 10, 10)
                c!.fillStyle = "red"

                ghost.path.map((tile) =>
                    c!.fillRect(tile.xPos + 5, tile.yPos + 5, 10, 10)
                )
            }
        }
    }
}

function draw() {
    c?.clearRect(0, 0, canvas.width, canvas.height)
    c!.fillStyle = "black"
    c?.fillRect(0, 0, canvas.width, canvas.height)
    drawBoard()
    drawPlayer()
    if (!board.lifeLost) {
        drawGhosts()
    }
}

function updateGhostMode() {
    for (let ghost of ghostActive) {
        if (!ghost.frightened) {
            if (ghost.mode === "chase") {
                if (
                    ghost.endTimeMode - ghost.beginTimeMode >
                    board.chaseTimeOut
                ) {
                    ghost.mode = "scatter"
                    ghost.beginTimeMode = Math.floor(Date.now() / 1000)
                    ghost.endTimeMode = Math.floor(Date.now() / 1000)
                    ghost.phaseChange = true
                } else {
                    ghost.endTimeMode = Math.floor(Date.now() / 1000)
                }
            } else if (ghost.mode === "scatter") {
                if (
                    ghost.endTimeMode - ghost.beginTimeMode >
                    board.scatterTimeOut
                ) {
                    ghost.mode = "chase"
                    ghost.beginTimeMode = Math.floor(Date.now() / 1000)
                    ghost.endTimeMode = Math.floor(Date.now() / 1000)
                    ghost.phaseChange = true
                } else {
                    ghost.endTimeMode = Math.floor(Date.now() / 1000)
                }
            }
        } else {
            let correctGhostPos = ghost.xPos % 2 === 0 && ghost.yPos % 2 === 0
            if (
                (ghost.endTimeFrightened - ghost.beginTimeFrightened >
                    board.frightenedTimeOut &&
                    correctGhostPos) ||
                (ghost.touched && ghost.xPos === 490 && ghost.yPos === 350)
            ) {
                board.endFrightened(ghost)
            } else {
                ghost.endTimeFrightened = Math.floor(Date.now() / 1000)
            }
        }
    }
}

function loop() {
    board.time += 1
    draw()
    updatePlayer()
    const isCoin = (object: any) => object.type !== "coin"
    if (!board.boardMatrix.flat().some(isCoin)) {
        // Here we enter the state where the level is completed and the animation will be played and a new level will be loaded.
        if (board.flicker === 0) {
            setTimeout(() => {
                console.log("Timeout")
            }, 1500)
        }
        board.boardMatrix.map((boardRow) =>
            boardRow.map((boardTile) =>
                boardTile.hasOwnProperty("color") && boardTile.color === "blue"
                    ? (boardTile.color = "white")
                    : boardTile.hasOwnProperty("color") &&
                      boardTile.color === "white"
                    ? (boardTile.color = "blue")
                    : console.log("Nothing")
            )
        )
        if (board.flicker <= 7) {
            board.flicker += 1
            setTimeout(() => {
                window.requestAnimationFrame(loop)
            }, 500)
        } else {
            // start new game
        }
    } else {
        if (!board.lifeLost) {
            if (board.time >= 100 && !Pinky.hasEntered) {
                Pinky.enter()
                Pinky.tile = [(Pinky.yPos - 210) / 20, (Pinky.xPos - 210) / 20]
                if (Pinky.xPos === 490 && Pinky.yPos === 350) {
                    Pinky.hasEntered = true
                }
            }
            if (!clyde.hasEntered) {
                if (player.score >= 1000 && board.time >= 50) {
                    clyde.enter()
                    clyde.tile = [
                        (clyde.yPos - 210) / 20,
                        (clyde.xPos - 210) / 20
                    ]
                    if (clyde.xPos === 490 && clyde.yPos === 350) {
                        clyde.hasEntered = true
                    }
                }
            }

            if (!Inky.hasEntered) {
                if (player.score >= 500 && board.time >= 150) {
                    Inky.enter()
                    Inky.tile = [(Inky.yPos - 210) / 20, (Inky.xPos - 210) / 20]
                    if (Inky.xPos === 490 && Inky.yPos === 350) {
                        Inky.hasEntered = true
                    }
                }
            }

            updateGhostMode()
            for (let ghost of ghostActive) {
                board.checkPlayerGhostcollision(ghost, player)
            }
        }
        window.requestAnimationFrame(loop)
    }
}
init()

function preDraw() {
    c?.clearRect(0, 0, canvas.width, canvas.height)
    c!.fillStyle = "black"
    c?.fillRect(0, 0, canvas.width, canvas.height)

    drawBoard()

    window.requestAnimationFrame(preDraw)
}
const requestIdPreDraw = window.requestAnimationFrame(preDraw)

StartModelEl.addEventListener("click", () => {
    init()
    loop()
    algorithmDropdown!.style.display = "inline-block"
    showAlgorithmPathDiv!.style.display = "inline-block"
    StartModelEl.style.display = "none"
    cancelAnimationFrame(requestIdPreDraw)
})
