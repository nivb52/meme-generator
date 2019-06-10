'use strict'


function init() {
    var imgs = getImgs()
    renderImgs(imgs)
}

let gCurrLang ='en'

function onSelectLang(lang){
    console.log('select lang')
    setLang(lang);
    if (lang === 'he') document.body.classList.add('rtl');
    else document.body.classList.remove('rtl');
    doTrans();
}


















function onSubmit(){
    // var email = $('.input-mail').val()
    var subject = document.querySelector('.input-subject').value
    var message = document.querySelector('.input-text').value
    // console.log(email , subject , message)
    window.open(`https://mail.google.com/mail/u/0/?view=cm&fs=1&to=chen100030@gmail.com.com&su=${subject}&body=${message}&.com&tf=1`)

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


