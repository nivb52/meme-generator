'use strict'
let gMemes = [] // our elements
let currElement = ''

const canvas = document.querySelector('#my-canvas');
const ctx = canvas.getContext('2d')
const elTextTop = document.querySelector('#text-position-top')
const elTextBottom = document.querySelector('#text-position-bottom')

let elImg = document.querySelector('#img-id')
const elCanvasContainer = document.querySelector('.canvas-container')

let CANVAS_WIDTH
let CANVAS_HEIGHT

let gDefaultFontSize = '36';
let gDefaultFont = 'Ariel'
// canvas.style.backgroundImage = loadFromStorage('img')



function init() {
    getAndCreateImg()
    elImg.onload = function () {
        createCanvas()
        drawImg()
    }
    gMemes.push(creteMeme())
    gMemes.push(creteMeme())
}


function creteMeme(txt = 'just a sample text', size = gDefaultFontSize, font = gDefaultFont, align = 'left', color = 'red') {
    return {
        txt: txt, size: size, font: font, align: align, color: color //, x: x, y:y
    }
}
function getfont(currFont) {
    gMemes[0].font = currFont
    gDefaultFont = currFont
}



function getAndCreateImg() {
    if (localStorage.getItem('img')) {
        let imgUrl = loadFromStorage('img')
        elImg.src = imgUrl
    } else {
        alert('You did not pick an image you will be to redirect to gallery. if it is a mistake please report admin on about.html page')
        setTimeout(window.location.assign("index.html"), 3000)
    }
}

function createCanvas() {
    CANVAS_WIDTH = Math.min(vw(), document.querySelector('#img-id').naturalWidth)
    CANVAS_HEIGHT = Math.min(vh(), document.querySelector('#img-id').naturalHeight)
    canvas.width = CANVAS_WIDTH
    canvas.height = CANVAS_HEIGHT
    canvas.style.marginLeft = 'auto' // Center the Canvas
    canvas.style.marginRight = 'auto' // Center the Canvas
}

function drawImg() {
    ctx.drawImage(elImg, 0, 0, canvas.width, canvas.height)
}

function onSelectSize(currSize) {
    document.getElementById("size").innerHTML = currSize
    // gFontSize = currSize 
    gMemes[0].size = currSize
    // updateFontSize(newVal)
    return currSize
}

function getColor() {
    let fillColor = document.querySelector('#fill-color').value
    return fillColor
}

function drawText(x = canvas.width / 10, y = canvas.height / 10) {
    clearCanvas()
    ctx.fillStyle = getColor()
    ctx.strokeStyle = getColor() //'#000000' 
    let currFont = gMemes[0].size + 'px ' + gMemes[0].font
    ctx.font = currFont //gFontSize + 'px' + ' ' + gFont
    console.log(currFont);
    ctx.fillText(gMemes[0].txt, x, y);
    ctx.strokeText(gMemes[0].txt, x, y);
}

function getTextVal(el) {
    let currTxtVal = el.value

    if (el.name === 'bottom-text') {
        gMemes[1].txt = currTxtVal
        drawText(currTxtVal, canvas.width / 10, canvas.height - 50)
    } else if (el.name === 'top-text') {
        gMemes[0].txt = currTxtVal
        drawText(currTxtVal)
    } else return
    ctx.save()
}

function onChangeTxt(el) {
    getTextVal(el)
    console.log('changed');
    drawText()

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
            consol(offsetX, offsetY)
            break;
        default:
            return
    }
}

function addProps(char, x, y) {
    // TODO: CREATE THE FUNCTION 
    // AFTER BUTTON IS CLICKED AND ITEM IS PICKED
    ctx.beginPath()
    ctx.strokeText(char, x, y)
}

function onFileInputChange(ev) {
    handleImageFromInput(ev, drawImg)

}


//UPLOAD IMG WITH INPUT FILE
function handleImageFromInput(ev, onImageReady) {
    console.log(ev, onImageReady)
    document.querySelector('#my-canvas').innerHTML = ''
    var reader = new FileReader();

    reader.onload = function (event) {
        var img = new Image();
        elImg = img
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result;
    }
    reader.readAsDataURL(ev.target.files[0]);
}



let textarea
const maxX = canvas.offsetWidth - canvas.offsetLeft

function mouseDownOnTextarea(e) {
    var x = textarea.offsetLeft - e.clientX, y = textarea.offsetTop - e.clientY
    function drag(e) {
        textarea.style.left = e.clientX + x + 'px'
        textarea.style.top = e.clientY + y + 'px'
        // if (e.clientY + y > maxX || e.clientX + x < 0) 
        // if (e.clientY + y > CANVAS_HEIGHT || e.clientY + y < 0) return
        // textarea.value = "x: " + x + " y: " + y;

    }
    function stopDrag() {
        document.removeEventListener('mousemove', drag)
        document.removeEventListener('mouseup', stopDrag)
        // textarea.value = "x: " + x + " y: " + y
    }
    function getText() {
        // let txt = this.value
        console.log(this.value);

    }

    document.addEventListener('mousemove', drag)
    document.addEventListener('mouseup', stopDrag)
    document.addEventListener('onkeydown', getText)
}

canvas.addEventListener('click', function (e) {
    if (!textarea) {
        textarea = document.createElement('input')
        textarea.className = 'info'
        // textarea.style.backgroundColor = (255,255,255,0.1)
        textarea.addEventListener('mousedown', mouseDownOnTextarea)
        elCanvasContainer.appendChild(textarea)
    }
    // var x = e.clientX - canvas.offsetLeft,  y = e.clientY - canvas.offsetTop
    // textarea.value = "x: " + x + " y: " + y
    textarea.value = 'test'
    textarea.style.top = e.clientY + 'px'
    textarea.style.left = e.clientX + 'px'
}, false)
