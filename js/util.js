'use strict'

function saveToStorage(key, value) {
    var strValue = JSON.stringify(value);
    localStorage.setItem(key, strValue);
}

function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}


function vh() {
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return (h) ;
}

function vw() {
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth);
    return (w);
}






// function mouseDownOnTextarea(e) {

//     const { offsetX, offsetY } = ev
//     console.log(offsetX,' ',offsetY);
//     dragMem(offsetX, offsetY)
    
//     function stopDrag() {
//         document.removeEventListener('mousemove', drag)
//         document.removeEventListener('mouseup', stopDrag)
//         // textarea.value = "x: " + x + " y: " + y
//     }

//     document.addEventListener('mousemove', dragMem)
//     document.addEventListener('mouseup', stopDrag)
// }

// canvas.addEventListener('click', function (e) {

// }, false)
