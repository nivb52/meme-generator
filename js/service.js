'use strict'
let gCurrLang = 'en'

let gKeywords = getKeywords()


let gCurrLang ='en'


function getKeywords() {    
    if (gCurrLang === 'he') {
        return {
            'שמח': 12,
            'איש': 1,
            'אישה': 3,
            'עצבני': 8,
            'ילד': 5
        }
    }
    else {
        return {
            'happy': 12,
            'man': 1,
            'woman': 3,
            'angry': 8,
            'child': 5
        }
    }
}

function updateGkeywords(keyword) {
    gKeywords = getKeywords()


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



// for (langName in langVotesMap) {
//     var votesCount = langVotesMap[langName];
//     console.log('Language: ' + langName + ' has: ' + votesCount + ' votes');
// }


var gImgs = [{
    id: 1,
    url: '19.jpg',
    keywords: ['man', 'angry', 'עצבני', 'איש']
}, {
    id: 2,
    url: '2.jpg',
    keywords: ['woman', 'happy', 'שמח']
}, {
    id: 3,
    url: '5.jpg',
    keywords: ['child', 'ילד']
}, {
    id: 4,
    url: '8.jpg',
    keywords: ['happy', 'man', 'איש', 'שמח']
}, {
    id: 5,
    url: '9.jpg',
    keywords: ['happy', 'child', 'שמח', 'ילד']
}, {
    id: 6,
    url: '12.jpg',
    keywords: ['man', 'איש']
}, {
    id: 7,
    url: '003.jpg',
    keywords: ['man', 'angry', 'איש', 'עצבני']
}, {
    id: 8,
    url: '004.jpg',
    keywords: ['happy', 'dog', 'שמח', 'כלב']
}, {
    id: 9,
    url: '005.jpg',
    keywords: ['dog', 'child', 'ילד', 'כלב']
}, {
    id: 10,
    url: '006.jpg',
    keywords: ['cat', 'חתול']
}, {
    id: 11,
    url: 'img5.jpg',
    keywords: ['child', 'happy', 'שמח', 'ילד']
}, {
    id: 12,
    url: 'leo.jpg',
    keywords: ['man', 'happy', 'איש', 'שמח']
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
    // 'lorem-chen': {
    //     en: 'language',
    //     he: 'שפה'
    // },
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
    },man: {
        en: 'man',
        he: 'איש'
    },woman: {
        en: 'woman',
        he: 'אישה'
    },angry: {
        en: 'angry',
        he: 'כועס'
    },child: {
        en: 'child',
        he: 'ילד'
    },

}

