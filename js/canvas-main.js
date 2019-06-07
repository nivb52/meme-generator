'use strict'
let gMemes = [] // our elements
const canvas = document.querySelector('#my-canvas');
let ctx
let currElement = ''
const elTextTop = document.querySelector('#text-position-top')
const elTextBottom = document.querySelector('#text-position-bottom')
const img = document.querySelector('#img-id')
let gFontSize = '16px';
let gFont = 'Ariel'


function init() {
    getAndCreateImg()
    ctx = canvas.getContext('2d')
    canvas.width = Math.max(vw() / 2, 400)
    canvas.height = Math.max(vh() / 2, 400)
    clearCanvas()
    setTimeout(drawImg, 100)
}



function selectSize(newVal) {
    document.getElementById("size").innerHTML = newVal
    gFontSize = newVal + 'px'
    console.log('gfontsize', gFontSize)
    // updateFontSize(newVal)     
    return newVal
}

function getColor() {
    let fillColor = document.querySelector('#fill-color').value
    return fillColor
}

function drawText(txt, x = canvas.width / 10, y = canvas.height / 10) {

    // gMemes.push(createEl(x, y))
    ctx.fillStyle = getColor()
    ctx.strokeStyle = getColor()
    console.log('in drow text', gFontSize)
    ctx.font = gFontSize + ' ' + gFont //getFont()
    console.log(ctx.font)
    // let txt = getTextVal()
    // ctx.fillText(txt, x, y); 
    ctx.strokeText(txt, x, y);
}

function getTextVal(areaTextNum) {
    let txt
    if (areaTextNum === 1) {
        txt = elTextBottom.value
        drawText(txt, canvas.width / 10, canvas.height - 50)
    } else {
        txt = elTextTop.value
        drawText(txt)
    }

    ctx.save()
}


function drawImg() {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    // ctx.beginPath()
    // ctx.save()
}

function getAndCreateImg() {
    if (localStorage.getItem('img')) {
        let imgUrl = loadFromStorage('img')
        console.log('chen', imgUrl)
        img.src = imgUrl

    } else {

        alert('You did not pick an image you will be to redirect to gallery. if it is a mistake please report admin on about.html page')
        setTimeout(window.location.assign("index.html"), 3000)
    }
}


function changeEl(elName) {
    currElement = elName
}

function draw(ev) {
    ctx.save()
    const {
        offsetX,
        offsetY
    } = ev
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

function clearCanvas() {
    //IMG IS MUST, IF NOT USER CAN GO BACK TO GALLERY
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawImg()
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

function drawLine(x, y) {
    ctx.beginPath()
    ctx.lineTo(x, y)
    ctx.lineTo(x + 50, y)
    ctx.closePath()
    ctx.lineWidth = 1
    ctx.strokeStyle = getColor()
    ctx.stroke();
}


// NOT IN USE
function addProps(char, x, y) {
    ctx.beginPath()
    ctx.strokeText(char, x, y)
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