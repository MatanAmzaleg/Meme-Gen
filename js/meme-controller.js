'use strict'


function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
    console.log(getMeme().selectedImgId);
    renderCanvas(getMeme().selectedImgId)

}

function renderCanvas(imgId) {
    var meme = getMeme()
    var photo = getImg(imgId)
    console.log(photo);
    let img = new Image()
    img.src = 'img/'+photo.url
    console.log(img);

    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height) 

    meme.lines.map(line => drawText(line))
}


function onSaveText(text) {
    saveText(text)
    renderCanvas(getMeme().selectedImgId)
}

function drawText(line) {
    const text = gCtx.measureText(`${line.txt}`)
    const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = line.stroke;
    gCtx.fillStyle = line.color;
    gCtx.font = `${line.size}px Impact`
    gCtx.textAlign = `${line.align}`;
    gCtx.fillText(`${line.txt}`, center.x , 100);
    gCtx.strokeText(`${line.txt}`, center.x , 100);
}

function onChangeTextColor(color) {
    saveColor(color)
    renderCanvas(getMeme().selectedImgId)
}

function onChangeStrokeColor(strokeClr){
    saveStroke(strokeClr)
    renderCanvas(getMeme().selectedImgId)
}

function onChangeFont(font){
    saveFont(font)
    renderCanvas(getMeme().selectedImgId)
}

function onChangeFontSize(op){
    setFontSize(op)
    renderCanvas(getMeme().selectedImgId)
}

function onAlignText(dir){
    setDirection(dir)
    renderCanvas(getMeme().selectedImgId)
}