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
    console.log('select img clicked', imgUrl)

}


function onImgDblClicked(imgUrl){
    console.log('dbd clicked', imgUrl)
    saveToStorage('img', imgUrl)
}

var prevSelectImg;


function onImgClicked(img) {
    
    if(prevSelectImg) prevSelectImg.classList.remove('selectImg')
    console.log('clicked', img)
    img.classList.toggle('selectImg');  
    prevSelectImg = img

}

function renderImgs() {
    var imgs = getImgs()
    console.log(imgs)
    var htmlImg = imgs.map(function (img) {
        return `<div  class="img img-${img.id} data">
        <img ondblclick="onImgDblClicked('${img.url}')" onclick="onImgClicked(this)" src="${img.url}" />
    </div>`
    });

    document.querySelector('.main-container').innerHTML = htmlImg.join("")
}