'use strict'


function init() {
    renderImgs()
}


function onSearchByKeywords() {
    var imgs = getImgs()
    console.log(imgs)
    var keywordSearch = document.querySelector('.search').value
    var currImgs = imgs.filter(function (img) {
        var currKeyWord = img.keywords.filter(function (keyWord) {
            // console.log(keyWord)
            // console.log(keywordSearch)
            return keyWord === keywordSearch
        })

        console.log(currKeyWord)
        return currKeyWord
    })
// console.log(currImgs)
    return currImgs
}

function onSelectImg(){

}




function onImgDblClicked(imgUrl){
    console.log('dbd clicked', imgUrl)
    saveToStorage('img', imgUrl)
    window.location.replace( "editor.html")
}


var gPrevSelectImg;

function onImgClicked(img ,imgUrl) {
    
    if(gPrevSelectImg) gPrevSelectImg.classList.remove('selectImg')
    console.log('i am clicked', img)
    img.classList.toggle('selectImg');
    gPrevSelectImg = img
    saveToStorage('img', imgUrl)

    
}

function renderImgs() {
    var imgs = getImgs()
    console.log(imgs)
    var htmlImg = imgs.map(function (img) {
        return `<div  class="img img-${img.id} data">
        <img ondblclick="onImgDblClicked('${img.url}')" onclick="onImgClicked(this,'${img.url}')" src="${img.url}" />
    </div>`
    });

    document.querySelector('.main-container').innerHTML = htmlImg.join("")
}


