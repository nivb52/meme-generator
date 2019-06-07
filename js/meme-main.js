'use strict'

// var gPrevSelectImg;

function init() {
    var imgs = getImgs()
    renderImgs(imgs)
}


function onSearchByKeywords() {
    let elSearch = document.querySelector('.search')
    let keyword = elSearch.value.toLowerCase()
    
    renderImgs(searchByKeyword(keyword))
}




function onImgClicked(img, imgUrl) {

    // if(gPrevSelectImg) gPrevSelectImg.classList.remove('selectImg')
    // console.log('i am clicked', img)
    // img.classList.toggle('selectImg');
    // gPrevSelectImg = img
    let imgBigUrl = `img/big/${imgUrl}`
    saveToStorage('img', imgBigUrl)
    window.location.replace("editor.html")
}

function renderImgs(imgs) {
    console.log(imgs)
    var htmlImg = imgs.map(function (img) {
        return `<div  class="img img-${img.id} data">
        <img  onclick="onImgClicked(this,'${img.url}')" src="img/${img.url}" />
    </div>`
    });

    document.querySelector('.main-container').innerHTML = htmlImg.join("")
}


