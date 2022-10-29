'use strict'

const STORAGE_KEY = 'savedMemesDB'

let gCurrLine = 0

let gMemes = []
let gCanvasSize= {}

var gMeme = {
    title: '',
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'My wife accused me for being immature.',
            size: 20,
            align: 'center',
            color: 'white',
            stroke: 'black',
            font: 'Impact',
            pos: {x:gCanvasSize.w/2, y:50 },
            rectPos: {}
        }
    ]
}

function createMemes(){
    var memes = loadFromStorage(STORAGE_KEY)

    if(!memes || !memes.length){
        memes = [createMeme]
    }
}

function createMeme(){
    return  {title: '',
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'My wife accused me for being immature.',
            size: 30,
            align: 'center',
            color: 'white',
            stroke: 'black',
            font: 'Impact',
            pos: {x:gCanvasSize.w/2, y:50 },
            rectPos: {}
        }
    ]
}
}

function updatePos(pos){
    console.log(pos);
    gMeme.lines[gCurrLine].pos = pos
}

function saveWidth(w){
    gMeme.lines[gCurrLine].pos.w = w
}


let gIsTextClicked = false
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function isTextClicked(clickedPos) {
    const pos = gMeme.lines[gCurrLine].pos
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    console.log(distance);
    return (distance <= (gMeme.lines[gCurrLine].pos.w)/2 && clickedPos.y < pos.y + gMeme.lines[gCurrLine].size && clickedPos.y > pos.y - gMeme.lines[gCurrLine].size) / 2
}

function resetMeme(){
    gMeme = createMeme()
}

function setIsTextClicked(isclicked) {
    gIsTextClicked = isclicked
}

function getIsTextClicked(){
    return gIsTextClicked
}

// function saveRectPos(x, y, w, h) {
//     gMeme.lines[gCurrLine].rectPos.x = x
//     gMeme.lines[gCurrLine].rectPos.y = y
//     gMeme.lines[gCurrLine].rectPos.w = w
//     gMeme.lines[gCurrLine].rectPos.h = h
// }

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
            font: 'Impact',
            pos: { y: gCanvasSize.h - 30 , x: gCanvasSize.w/2}
        }
    )
}

function transferCanvasSize(w,h){
    gCanvasSize.w = w
    gCanvasSize.h = h
    gMeme.lines[gCurrLine].pos.x = w/2
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
    var name = prompt('enter meme name')
    gMeme.title = name
    gMemes.push(gMeme)
    _saveMemeToStorage()
}

function _saveMemeToStorage() {
    saveToStorage(STORAGE_KEY, gMemes)
}

function getMemes(){
    return loadFromStorage(STORAGE_KEY)
   }