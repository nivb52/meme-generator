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
let gDefaultFont = 'impact'
let gDefaultColor = 'white'
// canvas.style.backgroundImage = loadFromStorage('img')



function init() {
    getAndCreateImg()
    elImg.onload = function () {
        createCanvas()
        drawImg()

        // TOP TXT - X,Y  x = canvas.width / 10, y = canvas.height / 10
        gMemes.push(creteMeme(canvas.width / 10, canvas.height / 10))

        // BOTTOM TXT - X,Y  canvas.width / 10, canvas.height - 50
        gMemes.push(creteMeme(canvas.width / 10, canvas.height - 10))

    }
}


function creteMeme(x, y, txt = '', size = gDefaultFontSize, font = gDefaultFont, align = 'left', color = gDefaultColor) {
    return {
        x: x, y: y,
        txt: txt, size: size, font: font, align: align, color: color
    }
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
    let currMem = getMem()
    gMemes[currMem].size = currSize
    return currSize
}


function getFont(currFont) {
    let currMem = getMem()
    gMemes[currMem].font = currFont
    gDefaultFont = currFont
    // elTextTop.classList.add(`${gDefaultFont}`)
}

function onChangeColor(currColor) {
    let currMem = getMem()
    gMemes[currMem].color = currColor
    drawText()
}


function drawText() {
    clearCanvas()

    gMemes.forEach(mem => {
        let currFont = mem.size + 'px ' + mem.font

        ctx.fillStyle = mem.color
        ctx.strokeStyle = '#000000'
        ctx.font = currFont //font-size + 'px' + ' ' + font-family

        ctx.fillText(mem.txt, mem.x, mem.y);
        ctx.strokeText(mem.txt, mem.x, mem.y);
    })
}

function getTextVal(el) {
    let currTxtVal = el.value 
    let currMem = getMem()
    console.log(currMem);

    gMemes[currMem].txt = currTxtVal

    drawText(currTxtVal)
    ctx.save()
}

function onChangeTxt(el = elTextTop) {
    getTextVal(el)
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
    let currMem = getMem()
    gMemes[currMem].txt = elTextTop.value
    // drawText()

}

function deleteOneMem(){
    let currMem = getMem()
    gMemes[currMem].txt = ''
    drawText()
}

function clearCanvas() {
    //IMG IS MUST, IF NOT USER CAN GO BACK TO GALLERY
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawImg()
}

function onChangeMem() {
    getMem()
    elTextTop.value = gMemes[getMem()].txt
    elTextTop.classList.add(`${gDefaultFont}`)
}

function getMem() {
    let memIdx = document.querySelector('#mem-choose').value
    return +memIdx
}

function addMem() {
    gMemes.push(creteMeme(CANVAS_WIDTH / 2 , CANVAS_HEIGHT / 2 ) )
    gMemes[gMemes.length - 1].txt = elTextTop.value ? elTextTop.value : 'Type Here'
}

function onAddMem() {
    addMem()
    let currSelectors = document.querySelector('#mem-choose').innerHTML
    let HTMLSelectors = `<option class="${gDefaultFont}" value="${gMemes.length-1}"> ${gMemes.length}</option>`
    
    let elSelcetMem = document.querySelector('#mem-choose')
    elSelcetMem.innerHTML = currSelectors + HTMLSelectors   //.appendChild()

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
    ctx.strokeStyle = onChangeColor()
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
            break;
        default:
            console.log('x', offsetX, '  y', offsetY);
            if (gMemes[0].x > offsetX) console.log('bigger than x');
            if (gMemes[0].y > offsetY) console.log('bigger than y');

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



// let textarea
// const maxX = canvas.offsetWidth - canvas.offsetLeft

// function mouseDownOnTextarea(e) {
//     var x = textarea.offsetLeft - e.clientX, y = textarea.offsetTop - e.clientY
//     function drag(e) {
//         textarea.style.left = e.clientX + x + 'px'
//         textarea.style.top = e.clientY + y + 'px'
//         // if (e.clientY + y > maxX || e.clientX + x < 0) 
//         // if (e.clientY + y > CANVAS_HEIGHT || e.clientY + y < 0) return
//         // textarea.value = "x: " + x + " y: " + y;

//     }
//     function stopDrag() {
//         document.removeEventListener('mousemove', drag)
//         document.removeEventListener('mouseup', stopDrag)
//         // textarea.value = "x: " + x + " y: " + y
//     }
//     function getText() {
//         // let txt = this.value
//         console.log(this.value);

//     }

//     document.addEventListener('mousemove', drag)
//     document.addEventListener('mouseup', stopDrag)
//     document.addEventListener('onkeydown', getText)
// }

// canvas.addEventListener('click', function (e) {
//     if (!textarea) {
//         textarea = document.createElement('input')
//         textarea.className = 'info'
//         // textarea.style.backgroundColor = (255,255,255,0.1)
//         textarea.addEventListener('mousedown', mouseDownOnTextarea)
//         elCanvasContainer.appendChild(textarea)
//     }
//     // var x = e.clientX - canvas.offsetLeft,  y = e.clientY - canvas.offsetTop
//     // textarea.value = "x: " + x + " y: " + y
//     textarea.value = 'test'
//     textarea.style.top = e.clientY + 'px'
//     textarea.style.left = e.clientX + 'px'
// }, false)
