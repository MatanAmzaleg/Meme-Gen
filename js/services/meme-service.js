'use strict'

var gSettings = {}

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            align: 'left',
            color: 'red'
        }
    ]
}


function saveSettings(settings) {
    gSettings = settings
    console.log(gSettings);
}

function getSettings(){
    return gSettings
}

function getMemes(){
    return gMeme
}