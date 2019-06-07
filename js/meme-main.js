'use strict'


function init() {
    var imgs = getImgs()
    renderImgs(imgs)
}

function checkEnter(ev) {
    // ENTER  keyCode = 13
    if (event.keyCode === 13) onSearchByKeywords()
}

function onSearchByKeywords() {
    let elSearch = document.querySelector('.search')
    let keyword = elSearch.value.toLowerCase()
    renderImgs(searchByKeyword(keyword))
}




function onImgClicked(imgUrl) {

    let imgBigUrl = `img/big/${imgUrl}`
    saveToStorage('img', imgBigUrl)
    window.location.replace("editor.html")
}

function renderImgs(imgs) {
    var htmlImg = imgs.map(function (img) {
        return `<div  class="img img-${img.id} data">
        <img  onclick="onImgClicked('${img.url}')" src="img/${img.url}" />
    </div>`
    });

    document.querySelector('.main-container').innerHTML = htmlImg.join("")
}


