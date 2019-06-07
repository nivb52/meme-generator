'use strict'

function saveToStorage(key, value) {
    var strValue = JSON.stringify(value);
    localStorage.setItem(key, strValue);
}

function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}

function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}



function vh() {
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return (h) ;
}

function vw() {
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth);
    return (w);
}

