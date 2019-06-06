'use strict'

let canvas
let ctx
let currElement = ''


function init() {
    canvas = document.querySelector('#my-canvas');
    ctx = canvas.getContext('2d')
    canvas.width = Math.max(window.innerWidth - 200, 400)
    canvas.height = Math.max(window.innerHeight - 300, 400)
}

function getColor() {
    let fillColor = document.querySelector('#fill-color').value
    return fillColor
}

function changeEl(elName) {
    // console.log(elName);

    currElement = elName
}

function draw(ev) {
    ctx.save()
    const { offsetX, offsetY } = ev
    switch (currElement) {
        case 'line':
            drawLine(offsetX, offsetY)
            break;
        default:
            return
    }
    // ctx.restore()
}

// drawText('HELLO CANVAS')

function drawLine(x, y) {
    ctx.beginPath()
    ctx.lineTo(x, y)
    ctx.lineTo(x + 50, y)
    ctx.closePath()
    ctx.lineWidth = 1
    ctx.strokeStyle = getColor()
    ctx.stroke();
}


function drawChar(char, x, y) {
    ctx.beginPath()
    ctx.strokeText(char, x, y)
}

function downloadCanvas(elLink) {
    ctx.save()
    ctx.restore()
    const data = canvas.toDataURL('image/jpeg')
    // const data = canvas.
    console.log(data);
    elLink.href = data
    elLink.download = 'my-meme.jpg'
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath()
}

function drawText(txt, x = canvas.width / 10, y = canvas.height / 10) {
    ctx.fillStyle = getColor()
    ctx.strokeStyle = getColor()
    ctx.font = "20px Arial";
    // ctx.fillText(txt, x, y);
    // let txt = getTextVal()
    ctx.strokeText(txt, x, y);
}


function drawImg() {
    const img = document.querySelector('#img-id');
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

}

const elText = document.querySelector('#text-position-top')
function getTextVal() {
    // ctx.restore()
    let txt = elText.value
    console.log(txt);
    drawText(txt)
    ctx.save()
}


function isDelete(ev) {
    var KeyID = event.keyCode;
    switch (KeyID) {
        case 8:
            // alert("backspace");
             let txt = elText.value
             drawText(txt)
            // drawText(elText.value)
            // text.slice
            break;
        case 46:
            // alert("delete");
            getTextVal()
            break;
        default:
            break;
    }
}
