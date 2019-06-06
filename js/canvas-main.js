'use strict'

let gIsDraw = false
let canvas
let ctx
let currElement = ''

let currEvent
let prevEvent
let movementY, movementX, movement

const X_FACTOR = 20
const Y_FACTOR = 20

function init() {
    canvas = document.querySelector('#my-canvas');
    ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth - 100
    canvas.height = window.innerHeight - 200

    document.documentElement.onmousemove = function (ev) {
        currEvent = ev
    }

}

setInterval(function () {
    prevEvent;
    if (prevEvent && currEvent) {
        movementX = Math.abs(currEvent.screenX - prevEvent.screenX)
        movementY = Math.abs(currEvent.screenY - prevEvent.screenY)
        movement = Math.round(Math.sqrt(movementX ** 2 + movementY ** 2))
    }
    prevEvent = currEvent
}, 100)

function getColor() {
    let fillColor = document.querySelector('#fill-color').value
    return fillColor
}

function changeEl(elName) {
    currElement = elName
}

function draw(ev) {
    if (!gIsDraw) return
    ctx.save()
    const { offsetX, offsetY } = ev
    switch (currElement) {
        case 'triangle':
            drawTriangle(offsetX, offsetY)
            break;
        case 'square':
            drawSquare(offsetX, offsetY)
            break;
        case 'circle':
            drawCircle(offsetX, offsetY)
            break;
        case 'arc':
            drawArc(offsetX, offsetY)
            break;
        case 'line':
            drawLine(offsetX, offsetY)
            break;
        case 'bird':
            drawBird(offsetX, offsetY)
            break;
    }
    // ctx.restore()
}


function onStartDraw() {
    gIsDraw = true
}

function onStopDraw() {
    gIsDraw = false
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath()
    movementX = 0
    movementY = 0
}


function drawTriangle(x, y) {
    // TODO: isFill if yes to make it fill
    // TODO: USER CHOOSE lineWidth 
    // USE : ctx.fillStyle = getColor() //'#ff0000'
    // AND : ctx.fill()

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 30, y - 30);
    ctx.lineTo(movementX + X_FACTOR, movementY + Y_FACTOR);
    ctx.closePath()
    ctx.lineWidth = 1;
    ctx.strokeStyle = getColor()
    ctx.stroke();
}

function drawLine(x, y) {
    ctx.beginPath()
    ctx.lineTo(x, y)
    ctx.lineTo(x + 40, y + 40)
    ctx.closePath()
    ctx.lineWidth = 5 - movement
    ctx.strokeStyle = getColor()
    ctx.stroke();
}

function drawSquare(x, y) {
    //TODO: isFill if yes to make it fill
    // USE : ctx.fillRect(x, y, 100, 100)
    // AND : ctx.fill()

    ctx.rect(x, y, movementX + X_FACTOR +10, movementY + Y_FACTOR)
    ctx.strokeStyle = getColor()
    ctx.stroke()
}

function drawArc(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, movement, 0, 1 * Math.PI);
    ctx.strokeStyle = getColor()
    ctx.stroke();
}

function drawBird(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, 0.25 * Math.PI);
    ctx.arc(x - 20, y - 20, 25, 1, 0.75 * Math.PI);
    ctx.strokeStyle = getColor()
    ctx.stroke();
}

function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, movement + X_FACTOR, 0, 2 * Math.PI);
    ctx.strokeStyle = getColor()
    ctx.stroke();
}

function downloadCanvas(elLink) {
    const data = canvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-img.jpg'
}