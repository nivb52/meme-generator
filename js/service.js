'use strict'



var gImgs = [{
    id: 1,
    url: '19.jpg',
    keywords: ['man', 'angry']
}, {
    id: 2,
    url: '2.jpg',
    keywords: ['women', 'happy']
}, {
    id: 3,
    url: '5.jpg',
    keywords: ['child']
}, {
    id: 4,
    url: '8.jpg',
    keywords: ['happy', 'man']
}, {
    id: 5,
    url: '9.jpg',
    keywords: ['happy', 'child']
}, {
    id: 6,
    url: '12.jpg',
    keywords: ['man']
}
    , {
    id: 6,
    url: '003.jpg',
    keywords: ['man']
}, {
    id: 6,
    url: '004.jpg',
    keywords: ['man']
}, {
    id: 6,
    url: '005.jpg',
    keywords: ['man']
}, {
    id: 6,
    url: '006.jpg',
    keywords: ['man']
}, {
    id: 6,
    url: 'img5.jpg',
    keywords: ['man']
}, {
    id: 6,
    url: 'leo.jpg',
    keywords: ['man']
}
];


function getImgs() {
    return gImgs
}


function searchByKeyword(keyword) {
    let imgs = getImgs()
    const result = imgs.filter((word) => {
        return (word.keywords.indexOf(keyword) >= 0);
    });
    return result
}
