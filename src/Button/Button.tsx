interface Clickable {
    onClick: () => void
}

class Button implements Clickable {
    text: string
    fillColor: string
    textColor: string
    x: number
    y: number
    width: number
    height: number

    constructor(text: string, fillColor: string, textColor: string) {
        this.text = text
        this.fillColor = fillColor
        this.textColor = textColor
        this.x = 0
        this.y = 0
        this.width = 0
        this.height = 0
        this.onClick = this.onClick.bind(this)
    }

    onClick(): void {
        console.log("Button was clicked!")
    }

    setPosition(x: number, y: number): void {
        this.x = x
        this.y = y
    }
    setSize(width: number, height: number): void {
        this.width = width
        this.height = height
    }

    draw(c: CanvasRenderingContext2D): void {
        // draw the button body
        c.fillStyle = this.fillColor
        c.fillRect(this.x, this.y, this.width, this.height)
        // draw the button text
        c.fillStyle = this.textColor
        c.textAlign = "center"
        c.textBaseline = "middle"
        c.font = "25px arial"
        c.fillText(
            this.text,
            this.x + this.width / 2,
            this.y + this.height / 2,
            this.width
        )
    }

    inBounds(mouseX: number, mouseY: number): boolean {
        return !(
            mouseX < this.x ||
            mouseX > this.x + this.width ||
            mouseY < this.y ||
            mouseY > this.y + this.height
        )
    }
}

export default Button
