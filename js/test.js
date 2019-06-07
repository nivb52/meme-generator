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

    // gMemes.push(createEl(x, y))
    ctx.fillStyle = '#f9f9f9'//getColor()
    ctx.strokeStyle = '#f9f9f9'//getColor()
    ctx.font = "17px Arial"
    // let txt = getTextVal()
    // ctx.fillText(txt, x, y); 
    ctx.strokeText(txt, x, y);
}