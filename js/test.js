let canvas
let ctx

const divOne = document.querySelector('#div-on-canvas-1');
canvas = document.querySelector('#my-canvas');
ctx = canvas.getContext('2d')


function downloadCanvas(elLink) {
    drawText(divOne.innerText)
    ctx.save()
    ctx.restore()
    const data = canvas.toDataURL('image/jpeg')
    // const data = canvas.
    console.log(data);
    elLink.href = data
    console.log(divOne.innerText);
    // elLink.download = 'test-meme.jpg'
}


function drawText(txt, x = canvas.width / 10, y = canvas.height / 10) {
    // console.log(getElPos(elmnt));
    
    x = divOne.offsetTop
    y = divOne.offsetLeft -divOne.getBoundingClientRect().height
    // gMemes.push(createEl(x, y))
    ctx.fillStyle = '#f9f9f9'//getColor()
    ctx.strokeStyle = '#f9f9f9'//getColor()
    ctx.font = "17px Arial"
    // let txt = getTextVal()
    // ctx.fillText(txt, x, y); 
    ctx.strokeText(txt, x, y);
}


// Make the DIV element draggable:
dragElement(divOne);

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById('.canvas-container')) {
        // if present, the header is where you move the DIV from:
        document.getElementById('.canvas-container').onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV: 
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        let bottomFactor = 20
        let leftFactor = 2

        let newPosTop = elmnt.offsetTop - pos2
        let newPosLeft = elmnt.offsetLeft - pos1


        // BORDERS 
        if (newPosTop < 0 || newPosLeft < 0) return

        let newPosRight = elmnt.offsetLeft + elmnt.offsetWidth
        let canvasMaxRight = canvas.getBoundingClientRect().right - canvas.getBoundingClientRect().left
        if (canvasMaxRight - newPosRight < 0) newPosLeft = canvasMaxRight - elmnt.offsetWidth - leftFactor

        let canvasMaxBottom = canvas.getBoundingClientRect().bottom
        let newPosBottom = elmnt.getBoundingClientRect().bottom

        if (canvasMaxBottom - newPosBottom < 0) newPosTop = canvas.getBoundingClientRect().top + elmnt.getBoundingClientRect().height + bottomFactor
        //END BORDERS

        // set the element's new position:
        elmnt.style.top = (newPosTop) + "px";
        elmnt.style.left = (newPosLeft) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}


function getElPos(elmnt) {
    return {
        x: elmnt.offsetTop,
        y: elmnt.offsetLeft
    }
}

