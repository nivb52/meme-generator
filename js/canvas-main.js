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

let gId = 0
let gFontSize = '36px';
let gFont = 'Ariel'
// canvas.style.backgroundImage = loadFromStorage('img')



function init() {
    getAndCreateImg()
    elImg.onload = function () {
        createCanvas()
        drawImg()
    }
}


function creteMeme(txt = 'just a sample text', size = '20px', align = 'left', color = 'red') {
    return {
        id: gId++ ,line: txt, size: size, align: align, color: color //getColor() //, x: x, y:y
    }
}
function getfont(font){
    console.log(font)
    gFont = font
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

function onSelectSize(newVal) {
    document.getElementById("size").innerHTML = newVal
    gFontSize = newVal + 'px'
    // updateFontSize(newVal)
    return newVal
}

function getColor() {
    let fillColor = document.querySelector('#fill-color').value
    return fillColor
}

function drawText(txt, x = canvas.width / 10, y = canvas.height / 10) {
    clearCanvas()
    ctx.fillStyle = getColor()
    ctx.strokeStyle = getColor() //'#000000' 
    ctx.font = gFontSize + ' ' + gFont
    // let txt = getTextVal()
    ctx.fillText(txt, x, y);
    ctx.strokeText(txt, x, y);
}

function getTextVal(areaText) {
    let txt = areaText.value
    
    if (areaText.name === 'bottom-text') {
        gMemes[0] = creteMeme(txt)
        drawText(txt, canvas.width / 10, canvas.height - 50)
    } else if (areaText.name === 'top-text') {
        gMemes[1] = creteMeme(txt)
        drawText(txt)
    } else return

    ctx.save()
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
            drawLine(offsetX, offsetY)
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
function handleImageFromInput(ev, onImageReady ) {
    console.log(ev , onImageReady)
    document.querySelector('#my-canvas').innerHTML = ''
    var reader = new FileReader();

    reader.onload = function (event) {
        var img = new Image();
        elImg =img
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result;
    }
    reader.readAsDataURL(ev.target.files[0]);
}
