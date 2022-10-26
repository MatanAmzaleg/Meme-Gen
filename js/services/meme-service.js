'use strict'


var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 50,
            align: 'center',
            color: 'white',
            stroke: 'black'
        }
    ]
}



function getMeme(){
    return gMeme
}

function saveText(text){
    gMeme.lines[0].txt = text
    console.log(gMeme);
}

function saveColor(color){
    gMeme.lines[0].color = color
}

function saveImgId(imgId){
    gMeme.selectedImgId = imgId
}

function saveStroke(strokeClr){
    gMeme.lines[0].stroke = strokeClr
}

function saveFont(font){
    gMeme.lines[0].font = font
}

function setFontSize(op){
    gMeme.lines[0].size += op
}

function setDirection(dir){
    gMeme.lines[0].align = dir
}