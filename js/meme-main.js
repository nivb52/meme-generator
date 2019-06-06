'use strict'


function init() {
    renderImgs()

}


function onSerchByKeywords() {
    var imgs = getImgs()
    console.log(imgs)
    var keywordSerch = document.querySelector('.search').value
    var currimgs = imgs.filter(function (img) {
        var currKeyWord = img.keywords.filter(function (keyWord) {
            // console.log(keyWord)
            // console.log(keywordSerch)
            return keyWord === keywordSerch
        })

        console.log(currKeyWord)
        return currKeyWord
    })
// console.log(currimgs)
    return currimgs
}
function onSelectImg(){
    console.log('i am dbd clicked', imgUrl)

}


function onImgDblClicked(imgUrl){
    console.log('i am dbd clicked', imgUrl)
    saveToStorage('img', imgUrl)
}

var prevSelectImg;

function onImgClicked(img) {
    
    if(prevSelectImg) prevSelectImg.classList.remove('selectImg')

    
    console.log('i am clicked', img)
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