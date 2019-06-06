'use strict'


function init() {
    renderImgs()

}


function onSerchByKeywords() {
    var imgs = getImgs()
    console.log(imgs)
    var keywordSerch = document.querySelector('.serch').value
    var currimgs = imgs.filter(function (img) {
        var currKeyWord = img.keywords.filter(function (keyWord) {
            // console.log(keyWord)
            // console.log(keywordSerch)
            return keyWord === keywordSerch
        })

        console.log(currKeyWord)
        return currKeyWord
    })
console.log(currimgs)
    return currimgs
}





function onImgClicked(img) {
    console.log('i am clicked', img)
    saveToStorage('img', img)

}

function renderImgs() {
    var imgs = getImgs()
    console.log(imgs)
    var htmlImg = imgs.map(function (img) {
        return `<div  class="img data">
        <img onclick="onImgClicked('${img.url}')" src="${img.url}" />
    </div>`
    });

    document.querySelector('.main-container').innerHTML = htmlImg.join("")
}