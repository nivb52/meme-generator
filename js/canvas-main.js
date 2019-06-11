'use strict'
let gMemes = [] // our elements
let currElement = ''
let gId = 0
let gTouchedIdx

const canvas = document.querySelector('#my-canvas');
const ctx = canvas.getContext('2d')
const elTextArea = document.querySelector('#text-position')

const elImg = document.querySelector('#img-id')
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

function creteMeme(x, y, txt = '', size = gDefaultFontSize, font = gDefaultFont, align = 'left', width = 0, color = gDefaultColor) {
    return {
        x: x, y: y, id: gId++,
        txt: txt, size: size, font: font, width: width,
        align: align, color: color
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
    CANVAS_HEIGHT = Math.min(vh(), document.querySelector('#img-id').naturalHeight) - 20;
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
    gMemes[currMem].y += currSize
    drawText()
}


function getFont(currFont) {
    // TODO : change font on the text area
    // example:  elTextTop.classList.add(`${gDefaultFont}`)
    let currMem = getMem()
    gMemes[currMem].font = currFont
    drawText()
}

function onChangeColor(currColor) {
    let currMem = getMem()
    gMemes[currMem].color = currColor
    drawText()
}

function onChangeAlign(currAlign) {
    let currMem = getMem()
    gMemes[currMem].align = currAlign
    drawText()
}

function drawText() {
    clearCanvas()

    gMemes.forEach(mem => {
        let currFont = mem.size + 'px ' + mem.font

        ctx.fillStyle = mem.color
        ctx.strokeStyle = '#000000' // TO THE LETTERS GOOD

        ctx.font = currFont //font-size + 'px' + ' ' + font-family
        ctx.textAlign = mem.align

        ctx.fillText(mem.txt, mem.x, mem.y)
        ctx.strokeText(mem.txt, mem.x, mem.y)

        // FOR LATER MOVING
        let metrics = ctx.measureText(mem.txt)
        mem.width = Math.ceil(metrics.width)
    })
}

function getTextVal(el) {
    let currTxtVal = el.value
    let currMem = getMem()

    gMemes[currMem].txt = currTxtVal

    drawText(currTxtVal)
    ctx.save()
}

function onChangeTxt(el = elTextArea) {
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
    gMemes[currMem].txt = elTextArea.value

}

function deleteOneMem() {
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
    let idx = getMem()
    elTextArea.value = gMemes[getMem()].txt
    elTextArea.classList.add(`${gDefaultFont}`)

    document.querySelector('#fill-color').value = gMemes[idx].color || "#f9f9f9"
}

function getMem() {
    let memIdx = document.querySelector('#mem-choose').value
    return +memIdx
}

function addMem() {
    gMemes.push(creteMeme(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2))
    gMemes[gMemes.length - 1].txt = elTextArea.value ? elTextArea.value : 'Type Here'
}

function onAddMem() {
    addMem()
    let currSelectors = document.querySelector('#mem-choose').innerHTML
    let HTMLSelectors = `<option class="${gDefaultFont}" value="${gMemes.length - 1}"> ${gMemes.length}</option>`

    let elSelcetMem = document.querySelector('#mem-choose')
    elSelcetMem.innerHTML = currSelectors + HTMLSelectors

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


function changeEl(elName) {
    currElement = elName
}



function findTouchedMem(ev) {
    const { offsetX, offsetY } = ev
    let factor = 5
    const clickedMEm = gMemes.find(mem => {
        return (
            offsetX - factor >= mem.x && offsetX <= mem.x + mem.width
            &&
            offsetY <= mem.y && offsetY >= mem.y - (+mem.size)
        )
    })


    if (clickedMEm) {
        gTouchedIdx = clickedMEm.id
        moveTouchedMem(ev)
        // gMemes[clickedMEm.id].x = offsetX
        // gMemes[clickedMEm.id].y = offsetY
        // console.log('moving...', clickedMEm.id)
        // drawText()
    }
}

function moveTouchedMem(ev) {
    const { offsetX, offsetY } = ev
    if (gTouchedIdx || gTouchedIdx === 0  ) {

        gMemes[gTouchedIdx].x = offsetX
        gMemes[gTouchedIdx].y = offsetY
        drawText()
    }
}

function onStopMovingMem(){
    gTouchedIdx = null
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




function uploadImg(elForm, ev) {
    ev.preventDefault();

    document.getElementById('imgData').value = canvas.toDataURL("image/jpeg");

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        console.log('uploadedImgUrl', uploadedImgUrl);

        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)

        window.open(`https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}`)

    }

    doUploadImg(elForm, onSuccess);
}

function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm);

    fetch('http://ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(function (response) {
            return response.text()
        })
        .then(onSuccess)
        .catch(function (error) {
            // console.error(error)
        })
}



(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/he_IL/sdk.js#xfbml=1&version=v3.0&appId=807866106076694&autoLogAppEvents=1';
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
