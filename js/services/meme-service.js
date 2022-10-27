'use strict'

let gCurrLine = 0

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'My wife accused me for being immature.',
            size: 40,
            align: 'center',
            color: 'white',
            stroke: 'black',
            pos: {y:100}
        }
    ]
}

let gIsTextClicked
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function isTextClicked(clickedPos){
  const pos = gMeme.lines[0].pos
  const distance = Math.sqrt((pos.x - clickedPos.x)**2 + (pos.y - clickedPos.y)**2)
  return distance <= (gMeme.lines[0].pos.w)/2
}

function getSelectedLine(){
    return gMeme.selectedLineIdx
}

function deleteLine() {
    gMeme.lines[gCurrLine].txt = ''
}


function swapSelectedLine(){
    if(gCurrLine === 0)  gMeme.selectedLineIdx = gCurrLine++
    else  gMeme.selectedLineIdx = gCurrLine--
   
}


function setIsTextClicked(isTextClicked){
    gIsTextClicked = isTextClicked
}

function addAnotherLine(){
    gMeme.lines.push(
        {
            txt: 'I told her to get out of my fort.',
            size: 35,
            align: 'center',
            color: 'white',
            stroke: 'black',
            pos: {y: 500}
        }
    )
}

function saveTextRec(x,y,w,h){
    gMeme.lines[gCurrLine].pos = x, y, w, h
    }
    
    function getPos(){
        return gMeme.lines[gCurrLine].pos
    }

function getMeme(){
    return gMeme
}

function saveText(text){
    gMeme.lines[gCurrLine].txt = text
    console.log(gMeme);
}

function saveColor(color){
    gMeme.lines[gCurrLine].color = color
}

function saveImgId(imgId){
    gMeme.selectedImgId = imgId
}

function getImgId(){
    return gMeme.selectedImgId
}

function saveStroke(strokeClr){
    gMeme.lines[gCurrLine].stroke = strokeClr
}

function saveFont(font){
    gMeme.lines[gCurrLine].font = font
}

function setFontSize(op){
    gMeme.lines[gCurrLine].size += op
}

function setDirection(dir){
    gMeme.lines[gCurrLine].align = dir
}

function getIsTextClick(){
    return gIsTextClicked
}