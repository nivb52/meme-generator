'use strict'
let gCurrLang = 'en'

let gKeywords = {
    'happy': 12,
    'man': 1,
    'woman': 3,
    'angry': 8,
    'child': 5
}



function updateGkeywords(keyword) {

    for (var currKeyword in gKeywords) {
        var keywordCount = gKeywords[currKeyword]
        console.log('keywords', currKeyword)
        if (currKeyword === keyword) {
            keywordCount++
            // console.log(keywordCount)
            gKeywords[keyword] = keywordCount

        } else if (!gKeywords[keyword]) {
            // console.log('no')
            gKeywords[keyword] = 1
        }
    }
    // console.log(gKeywords)
    saveToStorage('gKeywords', gKeywords)
    renderKeyWord()
}



var gImgs = [{
    id: 1,
    url: '19.jpg',
    keywords: ['man', 'angry']
}, {
    id: 2,
    url: '2.jpg',
    keywords: ['woman', 'happy']
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
}, {
    id: 7,
    url: '003.jpg',
    keywords: ['man', 'angry']
}, {
    id: 8,
    url: '004.jpg',
    keywords: ['happy', 'dog']
}, {
    id: 9,
    url: '005.jpg',
    keywords: ['dog', 'child']
}, {
    id: 10,
    url: '006.jpg',
    keywords: ['cat']
}, {
    id: 11,
    url: 'img5.jpg',
    keywords: ['child', 'happy']
}, {
    id: 12,
    url: 'leo.jpg',
    keywords: ['man', 'happy']
}];


function getImgs() {
    return gImgs
}


function searchByKeyword(keyword) {
    let imgs = getImgs()
    const result = imgs.filter((word) => {
        return (word.keywords.indexOf(keyword) !== -1);
    });
    return result
}


function setLang(lang) {
    gCurrLang = lang;
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]');

    for (var i = 0; i < els.length; i++) {
        var el = els[i];
        // var transKey = el.getAttribute('data-trans');
        var transKey = el.dataset.trans;

        var txt = getTrans(transKey);

        // Translating is actually complex and needs a library
        if (el.nodeName === 'INPUT') {
            el.setAttribute('placeholder', txt);
        } else {
            el.innerText = txt;
        }
    }
}

function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return 'UNKNOWN';

    var txt = keyTrans[gCurrLang];

    // If not found - use english
    if (!txt) txt = keyTrans['en'];

    return txt;
}

var gTrans = {
    title: {
        en: ' Meme Creator',
        he: 'עורך ממים'
    },
    searching: {
        en: 'filter by keywords',
        he: 'חיפוש על ידי מילות מפתח'
    },
    search: {
        en: 'search',
        he: 'חיפוש'
    },
    chen: {
        en: 'Chen Mordechai',
        he: 'חן מרדכי'
    },
    'load-80s': {
        en: ` load "The Years of 80's" `,
        he: 'טען את שנות ה-80'
    },
    niv: {
        en: 'Niv Bakelmane',
        he: 'ניב בקלמן'
    },
    // 'lorem-niv': {
    //     en: 'language',
    //     he: 'שפה'
    // },
    contact: {
        en: 'Get in touch',
        he: 'צור  קשר'
    },
    'p-contact': {
        en: 'In order to get in touch use the contactform below',
        he: 'כדי לשמור על קשר מלא את הטופס למטה'
    },
    mail: {
        en: 'Your E-mail',
        he: 'האימייל שלך'
    },
    sub: {
        en: 'Subject',
        he: 'נושא'
    },
    msg: {
        en: 'Message body',
        he: 'גוף ההודעה'
    },
    happy: {
        en: 'happy',
        he: 'שמח'
    }, man: {
        en: 'man',
        he: 'איש'
    }, woman: {
        en: 'woman',
        he: 'אישה'
    }, angry: {
        en: 'angry',
        he: 'כועס'
    }, child: {
        en: 'child',
        he: 'ילד'
    },



}


function loadTag(loadData) {
    const { folder, keywords } = loadData
    let imgs = []
    // HERE WE CAN DEFINE THE IMG COUNT OF ANY FOLDER
    
    if (folder === '80') { var count = 7 }
    
    count++
    for ( count > 1 ; --count ;) {
        let id = count
        let url = folder + '/' + folder + '-0' + id + '.jpeg'
        imgs.push(createImg(id, url, keywords))
    }
    
    return imgs
}

function createImg(id, url, keywords) {
    return {
        id: id++,
        url: url,
        keywords: keywords
    }
}