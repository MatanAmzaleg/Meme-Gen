'use strict'

const STORAGE_KEY = 'savedMemesDB'

let gCurrLine = 0

let gMemes = []

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
            pos: { y: 100 },
            rectPos: {}
        }
    ]
}

function saveWidthAndX(w, x){
    gMeme.lines[gCurrLine].pos.x = x
    gMeme.lines[gCurrLine].pos.w = w
}

let gIsTextClicked = false
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function isTextClicked(clickedPos) {
    const pos = gMeme.lines[gCurrLine].pos
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    console.log(distance);
    return (distance <= (gMeme.lines[gCurrLine].pos.w) && clickedPos.y < pos.y + gMeme.lines[gCurrLine].size && clickedPos.y > pos.y - gMeme.lines[gCurrLine].size) / 2
}

function setIsTextClicked(isclicked) {
    gIsTextClicked = isclicked
}

function getIsTextClicked(){
    return gIsTextClicked
}

function saveRectPos(x, y, w, h) {
    gMeme.lines[gCurrLine].rectPos.x = x
    gMeme.lines[gCurrLine].rectPos.y = y
    gMeme.lines[gCurrLine].rectPos.w = w
    gMeme.lines[gCurrLine].rectPos.h = h
    console.log(gMeme.lines[gCurrLine].rectPos);
}

function getCurrLine() {
    return gCurrLine
}

function getRectPos() {
    return gMeme.lines[gCurrLine].rectPos
}

function getSelectedLine() {
    return gMeme.selectedLineIdx
}

function deleteLine() {
    gMeme.lines.splice(gCurrLine, 1)
    gCurrLine--
}


function swapSelectedLine() {
    if (gCurrLine === 0) gMeme.selectedLineIdx = gCurrLine++
    else gMeme.selectedLineIdx = gCurrLine--

}

function addAnotherLine() {
    gMeme.lines.push(
        {
            txt: 'I told her to get out of my fort.',
            size: 35,
            align: 'center',
            color: 'white',
            stroke: 'black',
            pos: { y: 500 }
        }
    )
}

function saveTextRec(x, y, w, h) {
    gMeme.lines[gCurrLine].pos = x, y, w, h
}

function getPos() {
    return gMeme.lines[gCurrLine].pos
}

function getMeme() {
    return gMeme
}

function saveText(text) {
    gMeme.lines[gCurrLine].txt = text
    console.log(gMeme);
}

function saveColor(color) {
    gMeme.lines[gCurrLine].color = color
}

function saveImgId(imgId) {
    gMeme.selectedImgId = imgId
}

function getImgId() {
    return gMeme.selectedImgId
}

function saveStroke(strokeClr) {
    gMeme.lines[gCurrLine].stroke = strokeClr
}

function saveFont(font) {
    gMeme.lines[gCurrLine].font = font
}

function setFontSize(op) {
    gMeme.lines[gCurrLine].size += op
}

function setDirection(dir) {
    gMeme.lines[gCurrLine].align = dir
}

function getIsTextClick() {
    return gIsTextClicked
}

function saveMeme(){
    gMemes.push(gMeme)
    _saveMemeToStorage()
}

function _saveMemeToStorage() {
    saveToStorage(STORAGE_KEY, gMemes)
}