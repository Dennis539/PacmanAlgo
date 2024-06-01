// Clyde is supposed to be the simplest of the ghosts
// reason being that he just randomly moved through the board
import BaseGhost from "./baseGhost";

class Chaser extends BaseGhost{
    constructor() {
        super()
        this.xPos = 490
        this.yPos = 350
        this.color = "red"
    }

}

export default Chaser