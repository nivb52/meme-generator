'use strict'
let gCanvasEls = [] // our elements
let canvas
let ctx
let currElement = ''
const elText = document.querySelector('#text-position-top')
const img = document.querySelector('#img-id')

function init() {
    getAndCreateImg()
    canvas = document.querySelector('#my-canvas');
    ctx = canvas.getContext('2d')
    canvas.width = Math.max(window.innerWidth - 200, 400)
    canvas.height = Math.max(window.innerHeight - 300, 400)
    clearCanvas()
    setTimeout(drawImg, 50)
}

function selectSize(newVal) {
    document.getElementById("size").innerHTML = newVal;
}

function getColor() {
    let fillColor = document.querySelector('#fill-color').value
    return fillColor
}

function changeEl(elName) {
    currElement = elName
}

function draw(ev) {
    ctx.save()
    const { offsetX, offsetY } = ev
    switch (currElement) {
        case 'line':
            ev = 0; // 1 line for each press
            drawLine(offsetX, offsetY)
            break;
        default:
            findSelectedEl(offsetX, offsetY)
            return
    }
}


// FIND THE SELECTED TEXT FOR DRAG AND DROP
function findSelectedEl(x, y) {
    console.log('x ', x)
    console.log('y ', y)
    // const clickedEl = gCanvasEls.find(el => {
    //     // RETURN TRUE OR FALSE 
    //     return (
    //         el.x 

    //     )
    // })



}

function createEl(x, y) {
    return {
        x: x,
        y: y
    }
}

function drawText(txt, x = canvas.width / 10, y = canvas.height / 10) {

    gCanvasEls.push(createEl(x, y))

    ctx.fillStyle = getColor()
    ctx.strokeStyle = getColor()
    ctx.font = "20px Arial"; //getFont()
    // let txt = getTextVal()
    // ctx.fillText(txt, x, y); 
    ctx.strokeText(txt, x, y);
}

function getTextVal() {

    let txt = elText.value
    drawText(txt)
    ctx.save()
}


function drawLine(x, y) {
    ctx.beginPath()
    ctx.lineTo(x, y)
    ctx.lineTo(x + 50, y)
    ctx.closePath()
    ctx.lineWidth = 1
    ctx.strokeStyle = getColor()
    ctx.stroke();
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
    //IMG IS MUST, IF NOT USER CAN GO BACK TO GALLERY
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawImg()
}


function drawImg() {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    // ctx.beginPath()
    // ctx.save()

}

function getAndCreateImg() {
    if (localStorage.getItem('img')) {
        let imgUrl = loadFromStorage('img')
        img.src = imgUrl

    } else {
        clearCanvas()
        alert('You did not pick an image you will be to redirect to gallery. if it is a mistake please report admin on about.html page')
        setTimeout(window.location.assign("index.html"), 3000)
    }
}

function isDelete(ev) {
    var KeyID = event.keyCode;
    switch (KeyID) {
        case 8:
            // alert("backspace");
            deleteOneChar()
            break;
        case 46:
            // alert("delete");
            deleteOneChar()
            break;
        default:
            break;
    }
}

function deleteOneChar() {
    clearCanvas()
}


// NOT IN USE
function drawAccessoryElement(char, x, y) {
    ctx.beginPath()
    ctx.strokeText(char, x, y)
}