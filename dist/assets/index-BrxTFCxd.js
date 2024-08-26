var V = Object.defineProperty
var K = (h, e, i) =>
    e in h
        ? V(h, e, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (h[e] = i)
var n = (h, e, i) => (K(h, typeof e != 'symbol' ? e + '' : e, i), i)
;(function () {
    const e = document.createElement('link').relList
    if (e && e.supports && e.supports('modulepreload')) return
    for (const t of document.querySelectorAll('link[rel="modulepreload"]')) s(t)
    new MutationObserver((t) => {
        for (const a of t)
            if (a.type === 'childList')
                for (const W of a.addedNodes)
                    W.tagName === 'LINK' && W.rel === 'modulepreload' && s(W)
    }).observe(document, { childList: !0, subtree: !0 })
    function i(t) {
        const a = {}
        return (
            t.integrity && (a.integrity = t.integrity),
            t.referrerPolicy && (a.referrerPolicy = t.referrerPolicy),
            t.crossOrigin === 'use-credentials'
                ? (a.credentials = 'include')
                : t.crossOrigin === 'anonymous'
                ? (a.credentials = 'omit')
                : (a.credentials = 'same-origin'),
            a
        )
    }
    function s(t) {
        if (t.ep) return
        t.ep = !0
        const a = i(t)
        fetch(t.href, a)
    }
})()
class Q {
    constructor(e, i, s, t, a, W, u, d) {
        n(this, 'height')
        n(this, 'width')
        n(this, 'xPos')
        n(this, 'yPos')
        n(this, 'xMiddle')
        n(this, 'yMiddle')
        n(this, 'type')
        n(this, 'wallDir')
        n(this, 'lineBeginX')
        n(this, 'lineBeginY')
        n(this, 'lineEndX')
        n(this, 'lineEndY')
        n(this, 'neighbors')
        n(this, 'color')
        ;(this.height = 20),
            (this.width = 20),
            (this.xPos = e),
            (this.yPos = i),
            (this.xMiddle = this.xPos + 10),
            (this.yMiddle = this.xPos + 10),
            (this.type = 'Wall'),
            (this.wallDir = s),
            (this.lineBeginX = t),
            (this.lineBeginY = a),
            (this.lineEndX = W),
            (this.lineEndY = u),
            (this.neighbors = []),
            (this.color = d)
    }
}
class S {
    constructor(e, i, s) {
        n(this, 'height')
        n(this, 'width')
        n(this, 'xPos')
        n(this, 'yPos')
        n(this, 'xMiddle')
        n(this, 'yMiddle')
        n(this, 'type')
        n(this, 'neighbors')
        n(this, 'lighter')
        n(this, 'darker')
        n(this, 'lightness')
        ;(this.height = 8),
            (this.width = 8),
            (this.xPos = e),
            (this.yPos = i),
            (this.xMiddle = this.xPos + 10),
            (this.yMiddle = this.yPos + 10),
            (this.type = s),
            (this.neighbors = []),
            (this.lighter = !0),
            (this.darker = !1),
            (this.lightness = 50)
    }
    updateLightness() {
        this.lighter && this.lightness < 100
            ? (this.lightness += 1)
            : this.lightness >= 100
            ? ((this.lighter = !1), (this.darker = !0), (this.lightness -= 1))
            : this.darker && this.lightness > 50
            ? (this.lightness -= 1)
            : this.darker &&
              this.lightness <= 50 &&
              ((this.lighter = !0), (this.darker = !1), (this.lightness += 1))
    }
}
class j {
    constructor(e, i, s) {
        n(this, 'height')
        n(this, 'width')
        n(this, 'xPos')
        n(this, 'yPos')
        n(this, 'steps')
        n(this, 'boardMatrix')
        n(this, 'middlePosTile')
        n(this, 'chaseTimeOut')
        n(this, 'scatterTimeOut')
        n(this, 'frightenedTimeOut')
        n(this, 'lifeLost')
        n(this, 'time')
        n(this, 'setPinky')
        n(this, 'setClyde')
        n(this, 'setInky')
        n(this, 'flicker')
        n(this, 'gameOverScreen')
        ;(this.height = 600),
            (this.width = 0),
            (this.xPos = 150),
            (this.yPos = 150),
            (this.steps = 20),
            (this.boardMatrix = []),
            this.createBoard(),
            (this.middlePosTile = this.calculateMiddlePosTile()),
            (this.chaseTimeOut = e),
            (this.scatterTimeOut = i),
            (this.frightenedTimeOut = s),
            (this.lifeLost = !1),
            (this.time = 1),
            (this.setPinky = !1),
            (this.setClyde = !1),
            (this.setInky = !1),
            (this.flicker = 0),
            (this.gameOverScreen = !1)
    }
    calculateMiddlePosTile() {
        let e = []
        for (let i = 0; i < this.boardMatrix.length; i++)
            for (let s = 0; s < this.boardMatrix[i].length; s++)
                this.boardMatrix[i][s] &&
                    e.push([
                        this.boardMatrix[i][s].xPos + 10,
                        this.boardMatrix[i][s].yPos + 10
                    ])
        return e
    }
    createBoard() {
        let e
        var i = [
                'W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	N	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W',
                'W	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	W	N	W	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	W',
                'W	C	W	W	W	W	C	W	W	W	C	C	W	W	W	W	C	W	N	W	C	WR	WR	WR	WR	WR	WR	WR	WR	C	WY	WY	WY	WY	WY	WY	WY	WY	C	WG	WG	WG	WG	WG	WG	WG	WG	C	W	W	W	W	W	W	W	C	W',
                'W	C	W	W	W	W	C	W	W	W	C	W	W	W	W	W	C	W	W	W	C	WR	W	W	W	W	W	W	WR	C	WY	W	W	W	W	W	W	WY	C	WG	W	W	W	W	W	W	WG	C	W	W	W	W	W	W	W	C	W',
                'W	CP	C	C	C	C	C	W	W	W	W	W	W	W	W	C	C	C	C	C	C	WR	W	WR	WR	WR	WR	WR	WR	C	WY	W	WY	WY	WY	WY	WY	WY	C	WG	W	WG	WG	WG	WG	WG	WG	C	C	C	C	C	C	C	C	CP	W',
                'W	W	W	W	W	W	C	W	W	W	W	W	W	W	C	C	W	W	W	W	C	WR	W	WR	CP	C	C	C	C	C	WY	W	WY	C	C	C	C	C	C	WG	W	WG	C	C	C	C	C	C	W	W	C	W	W	W	W	W	W',
                'N	N	N	N	N	W	C	W	W	W	W	W	W	W	C	W	W	N	N	W	C	WR	W	WR	WR	WR	WR	WR	WR	C	WY	W	WY	WY	WY	WY	WY	WY	C	WG	W	WG	WG	WG	WG	WG	WG	C	W	W	C	W	N	N	N	N	N',
                'W	W	W	W	W	W	C	W	W	W	W	W	W	C	C	W	N	N	N	W	C	WR	W	W	W	W	W	W	WR	C	WY	W	W	W	W	W	W	WY	C	WG	W	W	W	W	W	W	WG	C	W	W	C	W	W	W	W	W	W',
                'WN	C	C	C	C	C	C	W	W	W	W	W	W	W	C	W	W	N	N	W	C	WR	W	WR	WR	WR	WR	WR	WR	C	WY	W	WY	WY	WY	WY	WY	WY	C	WG	WG	WG	WG	WG	WG	W	WG	C	W	W	C	C	C	C	C	C	W',
                'W	W	W	W	W	W	C	W	W	W	W	W	W	W	C	C	W	W	W	W	C	WR	W	WR	C	C	C	C	C	C	WY	W	WY	C	C	C	C	C	C	C	C	C	C	C	WG	W	WG	C	W	W	C	W	W	W	W	W	W',
                'N	N	N	N	N	W	C	W	W	W	W	W	W	W	W	C	C	C	C	C	C	WR	W	WR	WR	WR	WR	WR	WR	C	WY	W	WY	WY	WY	WY	WY	WY	C	WG	WG	WG	WG	WG	WG	W	WG	C	W	W	C	W	N	N	N	N	N',
                'W	W	W	W	W	W	C	W	W	W	C	W	W	W	W	W	C	W	W	W	C	WR	W	W	W	W	W	W	WR	C	WY	W	W	W	W	W	W	WY	C	WG	W	W	W	W	W	W	WG	C	C	C	C	W	W	W	W	W	W',
                'W	C	C	C	C	C	C	W	W	W	C	C	W	W	W	W	C	W	N	W	C	WR	WR	WR	WR	WR	WR	WR	WR	C	WY	WY	WY	WY	WY	WY	WY	WY	C	WG	WG	WG	WG	WG	WG	WG	WG	C	W	W	C	C	C	C	C	C	W',
                'W	C	W	W	W	W	C	C	C	C	C	C	C	C	C	C	C	W	N	W	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	W	W	W	C	W	W	W	C	W',
                'W	C	W	W	W	W	C	W	W	W	W	W	W	W	W	W	C	W	N	W	C	W	W	W	W	W	W	W	W	W	W	W	C	W	W	C	W	W	W	W	W	W	W	W	W	W	W	C	W	W	W	C	W	W	W	C	W',
                'W	C	W	W	W	W	C	W	W	W	W	W	W	W	W	W	C	W	N	W	C	W	W	W	W	W	W	W	W	W	W	W	C	W	W	C	W	W	W	W	W	W	W	W	W	W	W	C	W	W	W	C	W	W	W	C	W',
                'W	CP	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	W	N	W	C	C	C	C	C	C	C	C	C	C	C	C	C	W	W	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	C	CP	W',
                'W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	N	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W	W'
            ],
            s = this.xPos + 50,
            t = this.yPos + 50
        ;(this.width = i[0].split('	').length * this.steps + 100),
            (this.height = i.length * this.steps + 100)
        var a = ''
        e = i.map((o) => o.split('	'))
        let W = 1,
            u = 1,
            d = 1,
            f = 1
        for (let o = 0; o < e.length; o++) {
            var c = []
            for (let l = 0; l < e[o].length; l++) {
                if (e[o][l].includes('W')) {
                    l === 0 ||
                    o === 0 ||
                    l === e[o].length - 1 ||
                    o === e.length - 1
                        ? o < e.length - 1 &&
                          l < e[0].length - 1 &&
                          e[o + 1][l + 1].includes('C') &&
                          e[o][l + 1].includes('W') &&
                          e[o + 1][l].includes('W')
                            ? ((a = 'rightToBottom'),
                              (W = s + 20),
                              (u = t + 10),
                              (d = s + 10),
                              (f = t + 20))
                            : l < e[0].length - 1 &&
                              o > 0 &&
                              e[o - 1][l + 1].includes('C') &&
                              e[o][l + 1].includes('W') &&
                              e[o - 1][l].includes('W')
                            ? ((a = 'rightToTop'),
                              (W = s + 20),
                              (u = t + 10),
                              (d = s + 10),
                              (f = t))
                            : o < e.length - 1 &&
                              l > 0 &&
                              e[o + 1][l - 1].includes('C') &&
                              e[o][l - 1].includes('W') &&
                              e[o + 1][l].includes('W')
                            ? ((a = 'leftToBottom'),
                              (W = s + 20),
                              (u = t + 10),
                              (d = s + 10),
                              (f = t + 20))
                            : o > 0 &&
                              l > 0 &&
                              e[o - 1][l - 1].includes('C') &&
                              e[o][l - 1].includes('W') &&
                              e[o - 1][l].includes('W')
                            ? ((a = 'leftToTop'),
                              (W = s),
                              (u = t),
                              (d = s + 10),
                              (f = t + 10))
                            : o === 0 || o === e.length - 1
                            ? ((a = 'leftToRight'),
                              (W = s),
                              (u = t + 10),
                              (d = s + 20),
                              (f = t + 10))
                            : (l === 0 || l === e[0].length - 1) &&
                              ((a = 'upToBottom'),
                              (W = s + 10),
                              (u = t),
                              (d = s + 10),
                              (f = t + 20))
                        : l !== 0 &&
                          l !== e[o].length - 1 &&
                          o !== 0 &&
                          o !== e.length - 1 &&
                          (e[o - 1][l].includes('W') &&
                          e[o + 1][l].includes('W') &&
                          e[o][l - 1].includes('W') &&
                          e[o][l + 1].includes('W') &&
                          e[o - 1][l - 1].includes('W') &&
                          e[o + 1][l + 1].includes('W') &&
                          e[o + 1][l - 1].includes('W') &&
                          e[o - 1][l + 1].includes('W')
                              ? ((a = 'surrounded'),
                                (W = s + 10),
                                (u = t),
                                (d = s + 10),
                                (f = t + 20))
                              : (e[o - 1][l - 1].includes('C') &&
                                    !e[o + 1][l + 1].includes('C') &&
                                    e[o - 1][l + 1].includes('C') &&
                                    e[o + 1][l - 1].includes('C')) ||
                                (!e[o - 1][l - 1].includes('C') &&
                                    e[o + 1][l + 1].includes('C') &&
                                    !e[o - 1][l + 1].includes('C') &&
                                    !e[o + 1][l - 1].includes('C') &&
                                    !e[o + 1][l].includes('C') &&
                                    !e[o][l + 1].includes('C')) ||
                                (e[o - 1][l - 1].includes('C') &&
                                    e[o - 1][l].includes('C') &&
                                    e[o][l - 1].includes('C'))
                              ? ((a = 'rightToBottom'),
                                (W = s + 20),
                                (u = t + 10),
                                (d = s + 10),
                                (f = t + 20))
                              : (e[o - 1][l - 1].includes('C') &&
                                    e[o + 1][l + 1].includes('C') &&
                                    e[o - 1][l + 1].includes('C') &&
                                    !e[o + 1][l - 1].includes('C')) ||
                                (!e[o - 1][l - 1].includes('C') &&
                                    !e[o + 1][l + 1].includes('C') &&
                                    !e[o - 1][l + 1].includes('C') &&
                                    e[o + 1][l - 1].includes('C') &&
                                    !e[o][l - 1].includes('C') &&
                                    !e[o + 1][l].includes('C') &&
                                    !e[o][l + 1].includes('C')) ||
                                (e[o - 1][l].includes('C') &&
                                    e[o - 1][l + 1].includes('C') &&
                                    e[o][l + 1].includes('C'))
                              ? ((a = 'leftToBottom'),
                                (W = s),
                                (u = t + 10),
                                (d = s + 10),
                                (f = t + 20))
                              : (e[o - 1][l - 1].includes('C') &&
                                    e[o + 1][l + 1].includes('C') &&
                                    !e[o - 1][l + 1].includes('C') &&
                                    e[o + 1][l - 1].includes('C')) ||
                                (!e[o - 1][l - 1].includes('C') &&
                                    !e[o + 1][l + 1].includes('C') &&
                                    e[o - 1][l + 1].includes('C') &&
                                    !e[o + 1][l - 1].includes('C') &&
                                    !e[o - 1][l].includes('C') &&
                                    !e[o][l + 1].includes('C')) ||
                                (e[o][l - 1].includes('C') &&
                                    e[o + 1][l - 1].includes('C') &&
                                    e[o + 1][l].includes('C'))
                              ? ((a = 'rightToTop'),
                                (W = s + 20),
                                (u = t + 10),
                                (d = s + 10),
                                (f = t))
                              : (!e[o - 1][l - 1].includes('C') &&
                                    e[o + 1][l + 1].includes('C') &&
                                    e[o - 1][l + 1].includes('C') &&
                                    e[o + 1][l - 1].includes('C')) ||
                                (e[o - 1][l - 1].includes('C') &&
                                    !e[o + 1][l + 1].includes('C') &&
                                    !e[o - 1][l + 1].includes('C') &&
                                    !e[o + 1][l - 1].includes('C') &&
                                    !e[o - 1][l].includes('C') &&
                                    !e[o][l - 1].includes('C')) ||
                                (e[o][l + 1].includes('C') &&
                                    e[o + 1][l + 1].includes('C') &&
                                    e[o + 1][l].includes('C'))
                              ? ((a = 'leftToTop'),
                                (W = s + 10),
                                (u = t),
                                (d = s + 10),
                                (f = t + 20))
                              : e[o][l - 1].includes('W') &&
                                e[o][l + 1].includes('W')
                              ? ((a = 'leftToRight'),
                                (W = s),
                                (u = t + 10),
                                (d = s + 20),
                                (f = t + 10))
                              : e[o - 1][l].includes('W') &&
                                e[o + 1][l].includes('W')
                              ? ((a = 'upToBottom'),
                                (W = s + 10),
                                (u = t),
                                (d = s + 10),
                                (f = t + 20))
                              : ((a = ''),
                                (W = s + 10),
                                (u = t),
                                (d = s + 10),
                                (f = t + 20)))
                    let y
                    e[o][l] === 'WR'
                        ? (y = 'red')
                        : e[o][l] === 'WG'
                        ? (y = 'lawngreen')
                        : e[o][l] === 'WY'
                        ? (y = 'yellow')
                        : (y = 'blue'),
                        c.push(new Q(s, t, a, W, u, d, f, y))
                } else
                    e[o][l].includes('C')
                        ? e[o][l] === 'CP'
                            ? c.push(new S(s, t, 'PowerUpCoin'))
                            : c.push(new S(s, t, 'Coin'))
                        : e[o][l] === 'N'
                        ? c.push(new S(s, t, 'None'))
                        : c.push(null)
                s += 20
            }
            this.boardMatrix.push(c), (t += 20), (s = this.xPos + 50)
        }
        for (let o = 0; o < this.boardMatrix.length; o++)
            for (let l = 0; l < this.boardMatrix[o].length; l++)
                this.boardMatrix[o][l] &&
                    (o === 0
                        ? l === 0
                            ? (this.boardMatrix[o][l].neighbors = [
                                  null,
                                  this.boardMatrix[o + 1][l],
                                  this.boardMatrix[o][l + 1],
                                  null
                              ])
                            : l === this.boardMatrix[o].length - 1
                            ? (this.boardMatrix[o][l].neighbors = [
                                  null,
                                  this.boardMatrix[o + 1][l],
                                  null,
                                  this.boardMatrix[o][l - 1]
                              ])
                            : (this.boardMatrix[o][l].neighbors = [
                                  null,
                                  this.boardMatrix[o + 1][l],
                                  this.boardMatrix[o][l + 1],
                                  this.boardMatrix[o][l - 1]
                              ])
                        : o === this.boardMatrix.length - 1
                        ? l === 0
                            ? (this.boardMatrix[o][l].neighbors = [
                                  this.boardMatrix[o - 1][l],
                                  null,
                                  this.boardMatrix[o][l + 1],
                                  null
                              ])
                            : l === this.boardMatrix[o].length - 1
                            ? (this.boardMatrix[o][l].neighbors = [
                                  this.boardMatrix[o - 1][l],
                                  null,
                                  null,
                                  this.boardMatrix[o][l - 1]
                              ])
                            : (this.boardMatrix[o][l].neighbors = [
                                  this.boardMatrix[o - 1][l],
                                  null,
                                  this.boardMatrix[o][l + 1],
                                  this.boardMatrix[o][l - 1]
                              ])
                        : l === 0
                        ? (this.boardMatrix[o][l].neighbors = [
                              this.boardMatrix[o - 1][l],
                              this.boardMatrix[o + 1][l],
                              this.boardMatrix[o][l + 1],
                              null
                          ])
                        : l === this.boardMatrix[o].length - 1
                        ? (this.boardMatrix[o][l].neighbors = [
                              this.boardMatrix[o - 1][l],
                              this.boardMatrix[o + 1][l],
                              null,
                              this.boardMatrix[o][l - 1]
                          ])
                        : (this.boardMatrix[o][l].neighbors = [
                              this.boardMatrix[o - 1][l],
                              this.boardMatrix[o + 1][l],
                              this.boardMatrix[o][l + 1],
                              this.boardMatrix[o][l - 1]
                          ]))
    }
    checkPlayerWallCollision(e, i, s) {
        for (let t = 0; t < this.boardMatrix.length; t++)
            for (let a of this.boardMatrix[t]) {
                if (!a || a.type !== 'Wall') continue
                let W = a
                if (W.wallDir === 'upToBottom') {
                    let u = W.lineBeginX - 1,
                        d = W.yPos
                    for (let f = 0; f < 20; f++) {
                        const c = u - i,
                            o = d - s,
                            l = (c * c + o * o) ** 0.5,
                            y = i < u ? 1 : 2
                        if (l < e.radius + y)
                            return (
                                f === 19 &&
                                    (u <= e.xPos
                                        ? (e.xPos += 2)
                                        : (e.xPos -= 2)),
                                !0
                            )
                        d += 1
                    }
                } else if (W.wallDir === 'leftToRight') {
                    let u = W.xPos,
                        d = W.lineBeginY - 1
                    for (let f = 0; f < 20; f++) {
                        const c = u - i,
                            o = d - s,
                            l = (c * c + o * o) ** 0.5,
                            y = s < d ? 1 : 2
                        if (l < e.radius + y) return !0
                        u += 1
                    }
                } else if (W.wallDir === 'rightToBottom') {
                    let u = W.xPos + 19,
                        d = W.yPos + 9
                    for (let f = 0; f < 10; f++) {
                        const c = u - i,
                            o = d - s
                        if ((c * c + o * o) ** 0.5 < e.radius + 1)
                            return e.direction === 'right'
                                ? ((e.yPos -= 2), !0)
                                : (e.direction === 'down' && (e.xPos -= 2), !0)
                        u -= 1
                    }
                    for (let f = 0; f < 10; f++) {
                        const c = u - i,
                            o = d - s
                        if ((c * c + o * o) ** 0.5 < e.radius + 1)
                            return e.direction === 'right'
                                ? ((e.yPos -= 2), !0)
                                : (e.direction === 'down' && (e.xPos -= 2), !0)
                        d += 1
                    }
                } else if (W.wallDir === 'leftToBottom') {
                    let u = W.xPos,
                        d = W.yPos + 9
                    for (let f = 0; f < 10; f++) {
                        const c = u - i,
                            o = d - s
                        if ((c * c + o * o) ** 0.5 < e.radius + 1)
                            return e.direction === 'left'
                                ? ((e.yPos -= 2), !0)
                                : (e.direction === 'down' && (e.xPos += 2), !0)
                        u += 1
                    }
                    for (let f = 0; f < 10; f++) {
                        const c = u - i,
                            o = d - s
                        if ((c * c + o * o) ** 0.5 < e.radius + 1)
                            return e.direction === 'left'
                                ? ((e.yPos -= 2), !0)
                                : (e.direction === 'down' && (e.xPos += 2), !0)
                        d += 1
                    }
                } else if (W.wallDir === 'rightToTop') {
                    let u = W.xPos + 19,
                        d = W.yPos + 10
                    for (let f = 0; f < 10; f++) {
                        const c = u - i,
                            o = d - s
                        if ((c * c + o * o) ** 0.5 < e.radius + 1)
                            return e.direction === 'right'
                                ? ((e.yPos += 2), !0)
                                : (e.direction === 'up' && (e.xPos -= 2), !0)
                        u -= 1
                    }
                    for (let f = 0; f < 10; f++) {
                        const c = u - i,
                            o = d - s
                        if ((c * c + o * o) ** 0.5 < e.radius + 1)
                            return e.direction === 'right'
                                ? ((e.yPos += 2), !0)
                                : (e.direction === 'up' && (e.xPos -= 2), !0)
                        d -= 1
                    }
                } else if (W.wallDir === 'leftToTop') {
                    let u = W.xPos,
                        d = W.yPos + 9
                    for (let f = 0; f < 11; f++) {
                        const c = u - i,
                            o = d - s
                        if ((c * c + o * o) ** 0.5 < e.radius + 1)
                            return e.direction === 'left'
                                ? ((e.yPos += 2), !0)
                                : (e.direction === 'up' && (e.xPos += 2), !0)
                        u += 1
                    }
                    for (let f = 0; f < 11; f++) {
                        const c = u - i,
                            o = d - s
                        if ((c * c + o * o) ** 0.5 < e.radius + 1)
                            return e.direction === 'left'
                                ? ((e.yPos += 1), !0)
                                : (e.direction === 'up' && (e.xPos += 2), !0)
                        d -= 1
                    }
                }
            }
        return !1
    }
    playerCoinCollision(e, i) {
        let s = 0,
            t = 0
        e.xPos < i.xPos
            ? (s = i.xPos)
            : e.xPos > i.xPos + i.width && (s = i.xPos + i.width + 9),
            e.yPos < i.yPos
                ? (t = i.yPos)
                : e.yPos > i.yPos + i.height && (t = i.yPos + i.height + 9)
        const a = e.xPos - s,
            W = e.yPos - t
        if ((a * a + W * W) ** 0.5 <= e.radius) {
            e.score += 100
            let d = i.type
            return (i.type = 'Tile'), d
        }
        return null
    }
    checkPlayerGhostcollision(e, i) {
        let s = i.xPos - e.xPos,
            t = i.yPos - e.yPos
        if (Math.sqrt(s * s + t * t) < e.radius + i.radius)
            if (!e.touched && e.frightened) {
                const W = this.boardMatrix[e.tile[0]][e.tile[1]]
                ;(e.xPos = W.xMiddle),
                    (e.yPos = W.yMiddle),
                    (e.speed = 10),
                    (e.touched = !0)
            } else
                e.speed === 10 ||
                    ((this.lifeLost = !0),
                    (i.startAngle = Math.PI * 1.5),
                    (i.endAngle = Math.PI * 1.5 - 0.05))
    }
    endFrightened(e) {
        ;(e.frightened = !1),
            (e.touched = !1),
            e.name === 'Blinky' && (e.color = 'red'),
            e.name === 'Pinky' && (e.color = 'pink'),
            e.name === 'Inky' && (e.color = 'lightblue'),
            e.name === 'Clyde' && (e.color = 'orange'),
            (e.speed = 2)
    }
}
class H {
    constructor(e, i, s, t, a) {
        n(this, 'x')
        n(this, 'y')
        n(this, 'radius')
        n(this, 'dx')
        n(this, 'dy')
        n(this, 'alpha')
        ;(this.x = e),
            (this.y = i),
            (this.radius = s),
            (this.dx = t),
            (this.dy = a),
            (this.alpha = 1)
    }
    draw(e) {
        e.save(),
            (e.globalAlpha = this.alpha),
            (e.fillStyle = 'yellow'),
            e.beginPath(),
            e.arc(this.x, this.y, this.radius, 0, Math.PI * 2, !1),
            e.fill(),
            e.restore()
    }
    update(e) {
        this.draw(e),
            (this.alpha -= 0.01),
            (this.x += this.dx),
            (this.y += this.dy)
    }
}
class X {
    constructor(e, i) {
        n(this, 'xPos')
        n(this, 'yPos')
        n(this, 'radius')
        n(this, 'direction')
        n(this, 'mouthDirection')
        n(this, 'speed')
        n(this, 'score')
        n(this, 'startAngle')
        n(this, 'endAngle')
        n(this, 'eat')
        n(this, 'tile')
        n(this, 'fourTilesAhead')
        n(this, 'lives')
        n(this, 'dead')
        n(this, 'explosion')
        ;(this.xPos = 610),
            (this.yPos = 490),
            (this.radius = 18),
            (this.speed = 2),
            (this.direction = 'Kees'),
            (this.mouthDirection = 'Open'),
            (this.score = i),
            (this.startAngle = Math.PI * 1.5),
            (this.endAngle = Math.PI * 1.5 - 0.05),
            (this.eat = !1),
            (this.tile = [
                Math.floor((this.yPos - 200) / 20),
                Math.floor((this.xPos - 200) / 20)
            ]),
            (this.fourTilesAhead = [
                Math.floor((this.yPos - 200) / 20) - 4,
                Math.floor((this.xPos - 200) / 20)
            ]),
            (this.lives = e),
            (this.dead = !1),
            (this.explosion = null)
    }
    updateDirection(e, i) {
        let s = this.tile[1],
            t = this.tile[0]
        'ArrowLeft' in e
            ? (s <= 4
                  ? (this.fourTilesAhead = this.findEligibleTile(i, t, 1))
                  : i.boardMatrix[t][s - 4] &&
                    i.boardMatrix[t][s - 4].type !== 'Wall' &&
                    i.boardMatrix[t][s - 4].type !== 'None' &&
                    (this.fourTilesAhead = this.findEligibleTile(i, t, s - 4)),
              this.direction !== 'left' &&
                  ((this.direction = 'left'),
                  (this.startAngle = Math.PI),
                  (this.endAngle = Math.PI - 0.05),
                  (this.mouthDirection = 'Open')))
            : 'ArrowRight' in e
            ? (i.boardMatrix[0].length - 1 - s <= 4
                  ? (this.fourTilesAhead = this.findEligibleTile(
                        i,
                        t,
                        i.boardMatrix[0].length - 2
                    ))
                  : i.boardMatrix[t][s + 4] &&
                    i.boardMatrix[t][s + 4].type !== 'Wall' &&
                    i.boardMatrix[t][s + 4].type !== 'None' &&
                    (this.fourTilesAhead = this.findEligibleTile(i, t, s + 4)),
              this.direction !== 'right' &&
                  ((this.direction = 'right'),
                  (this.startAngle = 0),
                  (this.endAngle = -0.05),
                  (this.mouthDirection = 'Open')))
            : 'ArrowUp' in e
            ? (t <= 4
                  ? (this.fourTilesAhead = this.findEligibleTile(i, 1, s))
                  : i.boardMatrix[t - 4][s] &&
                    i.boardMatrix[t - 4][s].type !== 'Wall' &&
                    i.boardMatrix[t - 4][s].type !== 'None' &&
                    (this.fourTilesAhead = this.findEligibleTile(i, t - 4, s)),
              this.direction !== 'up' &&
                  ((this.direction = 'up'),
                  (this.startAngle = Math.PI * 1.5),
                  (this.endAngle = Math.PI * 1.5 - 0.05),
                  (this.mouthDirection = 'Open')))
            : 'ArrowDown' in e &&
              (i.boardMatrix.length - 1 - t <= 4
                  ? (this.fourTilesAhead = this.findEligibleTile(
                        i,
                        i.boardMatrix.length - 2,
                        s
                    ))
                  : i.boardMatrix[t + 4][s] &&
                    i.boardMatrix[t + 4][s].type !== 'Wall' &&
                    i.boardMatrix[t + 4][s].type !== 'None' &&
                    (this.fourTilesAhead = this.findEligibleTile(i, t + 4, s)),
              this.direction !== 'down' &&
                  ((this.direction = 'down'),
                  (this.startAngle = Math.PI / 2),
                  (this.endAngle = Math.PI / 2 - 0.05),
                  (this.mouthDirection = 'Open')))
    }
    findEligibleTile(e, i, s) {
        let t = ['']
        function a(W, u, d, f) {
            let c = [...Array(f.boardMatrix[0].length).keys()]
            if (
                !(
                    ![...Array(f.boardMatrix.length).keys()].includes(u) ||
                    !c.includes(d) ||
                    W.includes([u, d].toString())
                )
            )
                if (
                    !f.boardMatrix[u][d] ||
                    f.boardMatrix[u][d].type === 'Wall' ||
                    f.boardMatrix[u][d].type === 'None'
                ) {
                    W.includes([u, d].toString()) || W.push([u, d].toString())
                    let l = [
                        [u, d + 1],
                        [u, d - 1],
                        [u + 1, d],
                        [u - 1, d]
                    ]
                    for (let y of l) {
                        let b = a(W, y[0], y[1], f)
                        if (b) return [b[0], b[1]]
                    }
                } else return [u, d]
        }
        return a(t, i, s, e)
    }
    move(e, i) {
        'ArrowLeft' in e
            ? (this.xPos -= this.speed)
            : 'ArrowRight' in e
            ? (this.xPos += this.speed)
            : 'ArrowUp' in e
            ? (this.yPos -= this.speed)
            : 'ArrowDown' in e && (this.yPos += this.speed),
            (this.tile = [
                Math.floor((this.yPos - 200) / 20),
                Math.floor((this.xPos - 200) / 20)
            ]),
            this.updateDirection(e, i)
    }
    caught() {
        ;(this.startAngle += 0.08), (this.endAngle -= 0.08)
    }
    createExplosion(e) {
        let i = []
        for (let s = 0; s <= 150; s++) {
            let t = (Math.random() - 0.5) * (Math.random() * 6),
                a = (Math.random() - 0.5) * (Math.random() * 6),
                W = Math.random() * 3
            const u = e.xPos + 4 / 2,
                d = e.yPos + 4 / 2
            let f = new H(u, d, W, t, a)
            i.push(f)
        }
        return i
    }
}
function $(h) {
    return h &&
        h.__esModule &&
        Object.prototype.hasOwnProperty.call(h, 'default')
        ? h.default
        : h
}
var F = {}
;(function (h) {
    h.__esModule = !0
    var e = (function () {
        function i(s, t) {
            this._size = 0
            var a = s ?? 11,
                W = t ?? null
            if (a < 1)
                throw new Error(
                    'initial capacity must be greater than or equal to 1'
                )
            ;(this._queue = new Array(a)), (this._comparator = W)
        }
        return (
            (i.prototype.grow = function () {
                var s = this._size,
                    t = s + (s < 64 ? s + 2 : s >> 1)
                if (!Number.isSafeInteger(t))
                    throw new Error('capacity out of range')
                this._queue.length = t
            }),
            (i.prototype.siftup = function (s, t) {
                this._comparator !== null
                    ? this.siftupUsingComparator(s, t)
                    : this.siftupComparable(s, t)
            }),
            (i.prototype.siftupUsingComparator = function (s, t) {
                for (; s > 0; ) {
                    var a = (s - 1) >>> 1,
                        W = this._queue[a]
                    if (this._comparator(t, W) >= 0) break
                    ;(this._queue[s] = W), (s = a)
                }
                this._queue[s] = t
            }),
            (i.prototype.siftupComparable = function (s, t) {
                for (; s > 0; ) {
                    var a = (s - 1) >>> 1,
                        W = this._queue[a]
                    if (t.toString().localeCompare(W.toString()) >= 0) break
                    ;(this._queue[s] = W), (s = a)
                }
                this._queue[s] = t
            }),
            (i.prototype.sink = function (s, t) {
                this._comparator !== null
                    ? this.sinkUsingComparator(s, t)
                    : this.sinkComparable(s, t)
            }),
            (i.prototype.sinkUsingComparator = function (s, t) {
                for (var a = this._size >>> 1; s < a; ) {
                    var W = (s << 1) + 1,
                        u = this._queue[W],
                        d = W + 1
                    if (
                        (d < this._size &&
                            this._comparator(u, this._queue[d]) > 0 &&
                            (u = this._queue[(W = d)]),
                        this._comparator(t, u) <= 0)
                    )
                        break
                    ;(this._queue[s] = u), (s = W)
                }
                this._queue[s] = t
            }),
            (i.prototype.sinkComparable = function (s, t) {
                for (var a = this._size >>> 1; s < a; ) {
                    var W = (s << 1) + 1,
                        u = this._queue[W],
                        d = W + 1
                    if (
                        (d < this._size &&
                            u
                                .toString()
                                .localeCompare(this._queue[d].toString()) &&
                            (u = this._queue[(W = d)]),
                        t.toString().localeCompare(u.toString()) <= 0)
                    )
                        break
                    ;(this._queue[s] = u), (s = W)
                }
                this._queue[s] = t
            }),
            (i.prototype.indexOf = function (s) {
                for (var t = 0; t < this._queue.length; t++)
                    if (this._queue[t] === s) return t
                return -1
            }),
            (i.prototype.add = function (s) {
                var t = this._size
                return (
                    t >= this._queue.length && this.grow(),
                    (this._size = t + 1),
                    t === 0 ? (this._queue[0] = s) : this.siftup(t, s),
                    !0
                )
            }),
            (i.prototype.poll = function () {
                if (this._size === 0) return null
                var s = --this._size,
                    t = this._queue[0],
                    a = this._queue[s]
                return this._queue.slice(s, 1), s !== 0 && this.sink(0, a), t
            }),
            (i.prototype.peek = function () {
                return this._size === 0 ? null : this._queue[0]
            }),
            (i.prototype.contains = function (s) {
                return this.indexOf(s) !== -1
            }),
            (i.prototype.clear = function () {
                for (var s = 0, t = this._queue; s < t.length; s++) t[s]
                this._size = 0
            }),
            (i.prototype.size = function () {
                return this._size
            }),
            (i.prototype.empty = function () {
                return this._size === 0
            }),
            (i.prototype.toArray = function () {
                return this._queue.filter(function (s) {
                    return s
                })
            }),
            (i.prototype.toString = function () {
                return this.toArray().toString()
            }),
            (i.prototype[Symbol.iterator] = function () {
                var s = this,
                    t = 0
                return {
                    next: function () {
                        return { done: t == s._size, value: s._queue[t++] }
                    }
                }
            }),
            i
        )
    })()
    h.default = e
})(F)
const J = $(F)
class G {
    constructor(e) {
        n(this, 'xPos')
        n(this, 'yPos')
        n(this, 'radius')
        n(this, 'direction')
        n(this, 'speed')
        n(this, 'color')
        n(this, 'neighbors')
        n(this, 'nextTileCoord')
        n(this, 'prevTileCoord')
        n(this, 'preVisited')
        n(this, 'tile')
        n(this, 'mode')
        n(this, 'home')
        n(this, 'homeTarget')
        n(this, 'name')
        n(this, 'endTile')
        n(this, 'frightened')
        n(this, 'beginTimeMode')
        n(this, 'endTimeMode')
        n(this, 'beginTimeFrightened')
        n(this, 'endTimeFrightened')
        n(this, 'phaseChange')
        n(this, 'touched')
        n(this, 'hasEntered')
        ;(this.xPos = 590),
            (this.yPos = 510),
            (this.radius = 18),
            (this.speed = 2),
            (this.direction = 'right'),
            (this.color = ''),
            (this.neighbors = []),
            (this.nextTileCoord = []),
            (this.prevTileCoord = []),
            (this.preVisited = e.boardMatrix[0][0]),
            (this.tile = [(this.yPos - 210) / 20, (this.xPos - 210) / 20]),
            (this.mode = 'chase'),
            (this.home = [e.boardMatrix[0][0], e.boardMatrix[0][0]]),
            (this.homeTarget = e.boardMatrix[0][0]),
            (this.name = 'Blinky'),
            (this.endTile = e.boardMatrix[0][0]),
            (this.frightened = !1),
            (this.beginTimeMode = Math.floor(Date.now() / 1e3)),
            (this.endTimeMode = Math.floor(Date.now() / 1e3)),
            (this.beginTimeFrightened = 0),
            (this.endTimeFrightened = 0),
            (this.phaseChange = !1),
            (this.touched = !1),
            (this.hasEntered = !1)
    }
    _determineEndtile(e, i, s) {
        let t
        return (
            this.mode === 'chase'
                ? (t = e.boardMatrix[i][s])
                : this.mode === 'scatter'
                ? (t = this.homeTarget)
                : (t = e.boardMatrix[i][s]),
            t
        )
    }
    _moveToCenterOfTile() {
        this.xPos < this.nextTileCoord[0]
            ? (this.xPos += this.speed)
            : this.xPos > this.nextTileCoord[0]
            ? (this.xPos -= this.speed)
            : this.yPos < this.nextTileCoord[1]
            ? (this.yPos += this.speed)
            : this.yPos > this.nextTileCoord[1] && (this.yPos -= this.speed)
    }
    move(e, i, s, t, a, W) {
        if (
            e.middlePosTile.some(
                (d) => d[0] === this.xPos && d[1] === this.yPos
            )
        ) {
            let d = e.boardMatrix[this.tile[0]][this.tile[1]],
                f,
                c
            if (this.touched) this.endTile = e.boardMatrix[7][14]
            else {
                if (s === 'Blinky') (f = i.tile[1]), (c = i.tile[0])
                else if (s === 'Pinky')
                    (f = i.fourTilesAhead[1]), (c = i.fourTilesAhead[0])
                else if (s === 'Inky') {
                    let o = a.determineTarget(W, i, e)
                    ;(f = o[1]), (c = o[0])
                } else (f = i.fourTilesAhead[1]), (c = i.fourTilesAhead[0])
                this.endTile = this._determineEndtile(e, c, f)
            }
            this._determine_neighbors(e.boardMatrix),
                this._aStarAlgorithm(e, d, this.endTile, s, t, i)
        } else this._moveToCenterOfTile()
        this.tile = [
            Math.floor((this.yPos - 200) / 20),
            Math.floor((this.xPos - 200) / 20)
        ]
    }
    _determine_neighbors(e) {
        for (let i = 0; i < e.length; i++)
            for (let s = 0; s < e[i].length; s++) {
                let t = e[i][s]
                t &&
                    this.xPos >= t.xPos &&
                    this.xPos <= t.xPos + 19 &&
                    this.yPos >= t.yPos &&
                    this.yPos <= t.yPos + 19 &&
                    (this.neighbors = t.neighbors)
            }
    }
    becomeFrightened() {
        ;(this.frightened = !0),
            (this.phaseChange = !0),
            (this.speed = 1),
            (this.color = 'blue')
    }
    _assignRandomNextTileCoord() {
        for (let e of this.neighbors)
            if (
                (console.log(e),
                e.type !== 'Wall' && e.type !== 'None' && e != this.preVisited)
            )
                return [e.xMiddle, e.yMiddle]
        return [210, 210]
    }
    _determineErrorSpot(e, i, s) {
        return (
            (e === 'Pinky' && i.length <= 2 && s !== 'scatter') ||
            (e === 'Inky' && i.length <= 2 && s !== 'scatter') ||
            (e === 'Clyde' && i.length <= 8 && s !== 'scatter')
        )
    }
    dfs(e, i, s, t) {
        if (t.boardMatrix[s][i] === this.endTile) return [[s, i]]
        let a = [...Array(t.boardMatrix[0].length).keys()],
            W = [...Array(t.boardMatrix.length).keys()]
        !W.includes(s) ||
            !a.includes(i) ||
            e.includes([s, i].toString()) ||
            t.boardMatrix[s][i].type === 'Wall' ||
            e.includes([i, s].toString()) ||
            e.push([i, W].toString())
    }
    _aStarAlgorithm(e, i, s, t, a, W) {
        let u = 0,
            d = new J()
        d.add([0, u, i])
        let f = new Map(),
            c = new Map(),
            o = new Map(),
            l = e.boardMatrix,
            y = W.xPos - this.xPos,
            b = W.yPos - this.yPos,
            z = Math.sqrt(y * y + b * b)
        if (
            (this.touched &&
                z < this.radius + W.radius &&
                (this.preVisited = e.boardMatrix[W.tile[0]][W.tile[1]]),
            this.phaseChange)
        ) {
            ;(this.nextTileCoord = this.prevTileCoord),
                (this.phaseChange = !1),
                (this.preVisited = e.boardMatrix[this.tile[0]][this.tile[1]]),
                this._moveToCenterOfTile()
            return
        }
        for (let g = 0; g < l.length; g++)
            for (let m = 0; m < l[g].length; m++) {
                if (
                    !l[g][m] ||
                    l[g][m].type === 'Wall' ||
                    l[g][m].type === 'None'
                )
                    continue
                let M = l[g][m]
                c.set(M, 1 / 0), o.set(M, 1 / 0)
            }
        c.set(i, 0)
        let N = Math.abs(i.xMiddle - s.xMiddle),
            k = Math.abs(i.yMiddle - s.yMiddle)
        o.set(i, Math.sqrt(N * N + k * k))
        let A = new Set()
        for (A.add(i); !d.empty(); ) {
            let g = d.poll()[2]
            A.delete(g)
            let m = []
            if (g === s) {
                for (; Array.from(f.keys()).includes(g); )
                    (g = f.get(g)), m.push(g)
                if (m.length <= 1 && this.touched) {
                    ;(this.xPos = 490), (this.yPos = 350)
                    return
                }
                m.length <= 2 &&
                    this.mode === 'scatter' &&
                    (this.homeTarget === this.home[0]
                        ? (this.homeTarget = this.home[1])
                        : (this.homeTarget = this.home[0])),
                    this._determineErrorSpot(t, m, a)
                        ? ((this.nextTileCoord =
                              this._assignRandomNextTileCoord()),
                          t === 'Clyde' && (this.mode = 'scatter'))
                        : ((this.prevTileCoord = this.nextTileCoord),
                          (this.nextTileCoord = [
                              m[m.length - 2].xMiddle,
                              m[m.length - 2].yMiddle
                          ])),
                    (this.preVisited =
                        e.boardMatrix[this.tile[0]][this.tile[1]]),
                    this._moveToCenterOfTile()
                return
            }
            for (let M of g.neighbors)
                if (
                    M &&
                    M.type !== 'Wall' &&
                    M.type !== 'None' &&
                    M !== this.preVisited
                ) {
                    let _ = c.get(g) + 1
                    if (_ < c.get(M)) {
                        f.set(M, g), c.set(M, _)
                        let D = Math.abs(M.xMiddle - s.xMiddle),
                            O = Math.abs(M.yMiddle - s.yMiddle),
                            U = Math.sqrt(D * D + O * O)
                        o.set(M, _ + U),
                            A.has(M) ||
                                ((u += 1), d.add([o.get(M), u, M]), A.add(M))
                    }
                }
        }
        ;(t === 'Pinky' || this.frightened) &&
            (this.nextTileCoord = this._assignRandomNextTileCoord()),
            (this.preVisited = e.boardMatrix[this.tile[0]][this.tile[1]]),
            this._moveToCenterOfTile()
    }
}
class Z extends G {
    constructor(e) {
        super(e),
            (this.xPos = 490),
            (this.yPos = 350),
            (this.color = 'red'),
            (this.tile = [(this.yPos - 210) / 20, (this.xPos - 210) / 20])
        let i = e.boardMatrix[1].length - 2,
            s = e.boardMatrix[1].length - 8
        ;(this.home = [e.boardMatrix[1][i], e.boardMatrix[1][s]]),
            (this.homeTarget = e.boardMatrix[1][i]),
            (this.name = 'Blinky')
    }
}
class ee extends G {
    constructor(e) {
        super(e),
            (this.xPos = 530),
            (this.yPos = 350),
            (this.color = 'pink'),
            (this.tile = [(this.yPos - 210) / 20, (this.xPos - 210) / 20]),
            (this.home = [e.boardMatrix[1][1], e.boardMatrix[1][4]]),
            (this.homeTarget = e.boardMatrix[1][1]),
            (this.name = 'Pinky')
    }
    enter() {
        !this.hasEntered && this.xPos !== 490
            ? (this.xPos -= 1)
            : (this.tile = [(this.yPos - 210) / 20, (this.xPos - 210) / 20])
    }
}
class te extends G {
    constructor(e) {
        super(e),
            (this.xPos = 570),
            (this.yPos = 370),
            (this.color = 'lightblue'),
            (this.tile = [(this.yPos - 210) / 20, (this.xPos - 210) / 20])
        let i = e.boardMatrix.length - 2,
            s = e.boardMatrix.length - 2,
            t = e.boardMatrix[i].length - 2,
            a = e.boardMatrix[i].length - 10
        ;(this.home = [e.boardMatrix[i][t], e.boardMatrix[s][a]]),
            (this.homeTarget = e.boardMatrix[i][t]),
            (this.name = 'Inky')
    }
    determineTarget(e, i, s) {
        let t = i.fourTilesAhead[1] - Math.floor(e.tile[1]),
            a = i.fourTilesAhead[0] - Math.floor(e.tile[0]),
            W = s.boardMatrix.length,
            u = s.boardMatrix[0].length,
            d,
            f
        return (
            a >= 0
                ? i.fourTilesAhead[0] + a > W - 2
                    ? (f = W - 2)
                    : (f = i.fourTilesAhead[0] + a)
                : i.fourTilesAhead[0] + a < 1
                ? (f = 1)
                : (f = i.fourTilesAhead[0] + a),
            t >= 0
                ? i.fourTilesAhead[1] + t > u - 2
                    ? (d = u - 2)
                    : (d = i.fourTilesAhead[1] + t)
                : i.fourTilesAhead[1] + t < 1
                ? (d = 1)
                : (d = i.fourTilesAhead[1] + t),
            i.findEligibleTile(s, f, d)
        )
    }
    enter() {
        !this.hasEntered && (this.xPos !== 490 || this.yPos !== 350)
            ? (!this.hasEntered && this.yPos !== 350
                  ? (this.yPos -= 1)
                  : !this.hasEntered && this.xPos !== 490 && (this.xPos -= 1),
              console.log(this.xPos, this.yPos))
            : (this.tile = [(this.yPos - 210) / 20, (this.xPos - 210) / 20])
    }
}
class ie extends G {
    constructor(i) {
        super(i)
        n(this, 'lost')
        ;(this.xPos = 570),
            (this.yPos = 330),
            (this.color = 'orange'),
            (this.tile = [(this.yPos - 210) / 20, (this.xPos - 210) / 20])
        let s = i.boardMatrix.length - 2,
            t = i.boardMatrix.length - 6
        ;(this.home = [i.boardMatrix[s][1], i.boardMatrix[t][1]]),
            (this.homeTarget = i.boardMatrix[s][1]),
            (this.name = 'Clyde'),
            (this.lost = !1)
    }
    enter() {
        !this.hasEntered && (this.xPos !== 490 || this.yPos !== 350)
            ? (console.log('Kees not there'),
              !this.hasEntered && this.yPos !== 350
                  ? (this.yPos += 1)
                  : !this.hasEntered &&
                    this.xPos !== 490 &&
                    (console.log('Kees here'), (this.xPos -= 1)))
            : (this.tile = [(this.yPos - 210) / 20, (this.xPos - 210) / 20])
    }
}
class B {
    constructor(e, i, s) {
        n(this, 'text')
        n(this, 'fillColor')
        n(this, 'textColor')
        n(this, 'x')
        n(this, 'y')
        n(this, 'width')
        n(this, 'height')
        ;(this.text = e),
            (this.fillColor = i),
            (this.textColor = s),
            (this.x = 0),
            (this.y = 0),
            (this.width = 0),
            (this.height = 0),
            (this.onClick = this.onClick.bind(this))
    }
    onClick() {
        console.log('Button was clicked!')
    }
    setPosition(e, i) {
        ;(this.x = e), (this.y = i)
    }
    setSize(e, i) {
        ;(this.width = e), (this.height = i)
    }
    draw(e) {
        ;(e.fillStyle = this.fillColor),
            e.fillRect(this.x, this.y, this.width, this.height),
            (e.fillStyle = this.textColor),
            (e.textAlign = 'center'),
            (e.textBaseline = 'middle'),
            (e.font = '25px arial'),
            e.fillText(
                this.text,
                this.x + this.width / 2,
                this.y + this.height / 2,
                this.width
            )
    }
    inBounds(e, i) {
        return !(
            e < this.x ||
            e > this.x + this.width ||
            i < this.y ||
            i > this.y + this.height
        )
    }
}
let P = document.querySelector('canvas')
const r = P == null ? void 0 : P.getContext('2d')
P.width = window.innerWidth
P.height = window.innerHeight
var Y = {}
window.addEventListener('keydown', function (h) {
    ;(Y[h.key] = !0), h.preventDefault()
})
window.addEventListener('keyup', function (h) {
    delete Y[h.key]
})
function se() {
    let h = [],
        e = new B('Restart Game', '#eeaa00', 'black'),
        i = new B('End Game', '#eeaa00', 'black')
    return (
        e.setPosition(P.width / 2 - 200, P.height / 2),
        i.setPosition(P.width / 2 + 50, P.height / 2),
        (e.onClick = () => {
            document.location.reload()
        }),
        h.push(e),
        h.push(i),
        h.forEach((s) => s.setSize(150, 75)),
        h
    )
}
let C,
    x,
    R,
    T,
    p,
    w,
    v,
    q,
    I,
    L,
    oe = se()
function le() {
    ;(q = 20),
        (I = 7),
        (L = 10),
        (C = new X(0, 0)),
        (x = new j(q, I, L)),
        (R = new Z(x)),
        (T = new ee(x)),
        (p = new te(x)),
        (w = new ie(x)),
        (v = [R, T, w, p]),
        (x.time = 0)
}
function re() {
    let h = C
    ;(C = new X(h.lives, h.score)),
        (R.xPos = 490),
        (R.yPos = 350),
        (w.xPos = 570),
        (w.yPos = 330),
        (p.xPos = 570),
        (p.yPos = 370),
        (T.xPos = 530),
        (T.yPos = 350),
        (x.lifeLost = !1),
        (x.gameOverScreen = !1)
    for (let e of v)
        (e.touched = !1),
            (e.frightened = !1),
            (e.tile = [
                Math.floor((e.yPos - 200) / 20),
                Math.floor((e.xPos - 200) / 20)
            ]),
            e.name !== 'Blinky' && (e.hasEntered = !1),
            console.log(e)
    x.time = 1
}
function ne() {
    ;(r.fillStyle = 'black'),
        r == null || r.fillRect(x.xPos, x.yPos, x.width, x.height)
    for (let i = 0; i < x.boardMatrix.length; i++)
        for (let s = 0; s < x.boardMatrix[0].length; s++)
            if (x.boardMatrix[i][s]) {
                if (x.boardMatrix[i][s].type === 'Wall') {
                    ;(r.strokeStyle = x.boardMatrix[i][s].color),
                        (r.lineWidth = 2),
                        r == null || r.beginPath()
                    let t = x.boardMatrix[i][s]
                    t.wallDir === 'leftToRight'
                        ? (r == null || r.moveTo(t.xPos, t.yPos + 10),
                          r == null || r.lineTo(t.xPos + 20, t.yPos + 10))
                        : t.wallDir === 'upToBottom'
                        ? (r == null || r.moveTo(t.xPos + 10, t.yPos),
                          r == null || r.lineTo(t.xPos + 10, t.yPos + 20))
                        : t.wallDir === 'rightToBottom'
                        ? (r == null || r.moveTo(t.xPos + 20, t.yPos + 10),
                          r == null ||
                              r.arcTo(
                                  t.xPos + 10,
                                  t.yPos + 10,
                                  t.xPos + 10,
                                  t.yPos + 20,
                                  10
                              ))
                        : t.wallDir === 'leftToBottom'
                        ? (r == null || r.moveTo(t.xPos, t.yPos + 10),
                          r == null ||
                              r.arcTo(
                                  t.xPos + 10,
                                  t.yPos + 10,
                                  t.xPos + 10,
                                  t.yPos + 20,
                                  10
                              ))
                        : t.wallDir === 'rightToTop'
                        ? (r == null || r.moveTo(t.xPos + 20, t.yPos + 10),
                          r == null ||
                              r.arcTo(
                                  t.xPos + 10,
                                  t.yPos + 10,
                                  t.xPos + 10,
                                  t.yPos,
                                  10
                              ))
                        : t.wallDir === 'leftToTop' &&
                          (r == null || r.moveTo(t.xPos, t.yPos + 10),
                          r == null ||
                              r.arcTo(
                                  t.xPos + 10,
                                  t.yPos + 10,
                                  t.xPos + 10,
                                  t.yPos,
                                  10
                              )),
                        r == null || r.stroke()
                } else if (x.boardMatrix[i][s].type === 'Coin') {
                    let t = x.boardMatrix[i][s]
                    ;(r.fillStyle = 'orange'),
                        r.beginPath(),
                        r.moveTo(C.xPos, C.yPos),
                        r.arc(t.xPos + 10, t.yPos + 10, 2, 0, 90, !1),
                        r.lineTo(C.xPos, C.yPos),
                        r.fill(),
                        x.playerCoinCollision(C, t)
                } else if (x.boardMatrix[i][s].type === 'PowerUpCoin') {
                    let t = x.boardMatrix[i][s]
                    t.updateLightness(),
                        (r.fillStyle = `hsl(62,100%,${t.lightness}%)`),
                        r.beginPath(),
                        r.moveTo(C.xPos, C.yPos),
                        r.arc(t.xPos + 10, t.yPos + 10, 10, 0, 90, !1),
                        r.lineTo(C.xPos, C.yPos),
                        r.fill()
                    let a = x.playerCoinCollision(C, t)
                    if (a && a === 'PowerUpCoin')
                        for (let W of v)
                            W.becomeFrightened(),
                                (W.beginTimeFrightened = Math.floor(
                                    Date.now() / 1e3
                                )),
                                (W.endTimeFrightened = Math.floor(
                                    Date.now() / 1e3
                                ))
                }
                r.fillStyle = 'red'
            }
    let h = 220,
        e = 570
    r.fillStyle = 'yellow'
    for (let i = 0; i < C.lives; i++) {
        r.beginPath(), r.moveTo(h, e)
        let s = Math.PI + 0.55,
            t = Math.PI - 0.55
        r.arc(h, e, 10, s, t, !1), r.lineTo(h, e), r.fill(), (h += 30)
    }
}
function he(h, e) {
    ;(r.fillStyle = '#808080'),
        r.beginPath(),
        r == null ||
            r.roundRect(
                P.width / 3,
                P.height / 3,
                P.width / 3,
                P.height / 3,
                50
            ),
        r.fill(),
        (r.font = '20px Courier New'),
        (r.textAlign = 'center'),
        (r.strokeStyle = 'white'),
        r.strokeText('Oh he dead', P.width / 2, P.height / 2 - 80),
        e.gameOverScreen ||
            (P.addEventListener('click', (i) => {
                let s = i.pageX - (P.clientLeft + P.offsetLeft),
                    t = i.pageY - (P.clientTop + P.offsetTop)
                h.forEach((a) => {
                    a.inBounds(s, t) && a.onClick && a.onClick()
                })
            }),
            (e.gameOverScreen = !0)),
        h.forEach((i) => i.draw(r))
}
function We() {
    if (x.lifeLost)
        Math.abs(C.startAngle - C.endAngle) <= Math.PI * 2 - 0.155
            ? C.caught()
            : ((C.dead = !0),
              C.explosion || (C.explosion = C.createExplosion(C)),
              C.explosion.forEach((i, s) => {
                  i.alpha <= 0 ? C.explosion.splice(s, 1) : i.update(r)
              })),
            C.explosion &&
                C.explosion.length === 0 &&
                (C.lives > 0 ? ((C.lives -= 1), re()) : he(oe, x))
    else {
        if ((C.updateDirection(Y, x), C.direction === 'right'))
            var h = C.xPos + C.speed,
                e = C.yPos
        else if (C.direction === 'left')
            var h = C.xPos - C.speed,
                e = C.yPos
        else if (C.direction === 'up')
            var h = C.xPos,
                e = C.yPos - C.speed
        else
            var h = C.xPos,
                e = C.yPos + C.speed
        x.checkPlayerWallCollision(C, h, e) || C.move(Y, x)
    }
}
function ae() {
    C.dead ||
        (r.beginPath(),
        r.moveTo(C.xPos, C.yPos),
        r.arc(C.xPos, C.yPos, C.radius, C.startAngle, C.endAngle, !1),
        r.lineTo(C.xPos, C.yPos),
        (r.fillStyle = 'yellow'),
        r.fill(),
        Object.keys(Y).length !== 0 &&
            (C.mouthDirection === 'Open'
                ? ((C.startAngle += 0.08), (C.endAngle -= 0.08))
                : ((C.startAngle -= 0.08), (C.endAngle += 0.08))),
        Math.abs(C.startAngle - C.endAngle) > 2.5
            ? (C.mouthDirection = 'Close')
            : Math.abs(C.startAngle - C.endAngle) < 0.17 &&
              (C.mouthDirection = 'Open'))
}
function de() {
    for (let h of v)
        (r.fillStyle = h.color),
            r == null || r.beginPath(),
            r == null || r.arc(h.xPos, h.yPos, h.radius, 0, 2 * Math.PI),
            r == null || r.fill(),
            h.hasEntered && h.move(x, C, h.name, h.mode, p, R)
}
function ue() {
    r == null || r.clearRect(0, 0, P.width, P.height),
        (r.fillStyle = 'black'),
        r == null || r.fillRect(0, 0, P.width, P.height),
        ne(),
        ae(),
        x.lifeLost || de()
}
function fe() {
    for (let h of v)
        if (!h.frightened)
            h.mode === 'chase'
                ? h.endTimeMode - h.beginTimeMode > x.chaseTimeOut
                    ? ((h.mode = 'scatter'),
                      (h.beginTimeMode = Math.floor(Date.now() / 1e3)),
                      (h.endTimeMode = Math.floor(Date.now() / 1e3)),
                      (h.phaseChange = !0))
                    : (h.endTimeMode = Math.floor(Date.now() / 1e3))
                : h.mode === 'scatter' &&
                  (h.endTimeMode - h.beginTimeMode > x.scatterTimeOut
                      ? ((h.mode = 'chase'),
                        (h.beginTimeMode = Math.floor(Date.now() / 1e3)),
                        (h.endTimeMode = Math.floor(Date.now() / 1e3)),
                        (h.phaseChange = !0))
                      : (h.endTimeMode = Math.floor(Date.now() / 1e3)))
        else {
            let e = h.xPos % 2 === 0 && h.yPos % 2 === 0
            ;(h.endTimeFrightened - h.beginTimeFrightened >
                x.frightenedTimeOut &&
                e) ||
            (h.touched && h.xPos === 490 && h.yPos === 350)
                ? x.endFrightened(h)
                : (h.endTimeFrightened = Math.floor(Date.now() / 1e3))
        }
}
function E() {
    ;(x.time += 1), ue(), We()
    const h = (e) => e.type !== 'coin'
    if (!x.boardMatrix.flat().some(h))
        x.flicker === 0 &&
            setTimeout(() => {
                console.log('Timeout')
            }, 1500),
            x.boardMatrix.map((e) =>
                e.map((i) =>
                    i.hasOwnProperty('color') && i.color === 'blue'
                        ? (i.color = 'white')
                        : i.hasOwnProperty('color') && i.color === 'white'
                        ? (i.color = 'blue')
                        : console.log('Nothing')
                )
            ),
            x.flicker <= 7 &&
                ((x.flicker += 1),
                setTimeout(() => {
                    window.requestAnimationFrame(E)
                }, 500))
    else {
        if (!x.lifeLost) {
            x.time >= 100 &&
                !T.hasEntered &&
                (T.enter(),
                (T.tile = [(T.yPos - 210) / 20, (T.xPos - 210) / 20]),
                T.xPos === 490 && T.yPos === 350 && (T.hasEntered = !0)),
                w.hasEntered ||
                    (C.score >= 1e3 &&
                        x.time >= 50 &&
                        (w.enter(),
                        (w.tile = [(w.yPos - 210) / 20, (w.xPos - 210) / 20]),
                        w.xPos === 490 &&
                            w.yPos === 350 &&
                            (w.hasEntered = !0))),
                p.hasEntered ||
                    (C.score >= 500 &&
                        x.time >= 150 &&
                        (p.enter(),
                        (p.tile = [(p.yPos - 210) / 20, (p.xPos - 210) / 20]),
                        p.xPos === 490 &&
                            p.yPos === 350 &&
                            (p.hasEntered = !0))),
                fe()
            for (let e of v) x.checkPlayerGhostcollision(e, C)
        }
        window.requestAnimationFrame(E)
    }
}
le()
E()
