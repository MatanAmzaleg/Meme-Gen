'use strict'

let gAddClick = 1


function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
    console.log(getImgId());
    renderCanvas(getImgId())

}

function renderCanvas(imgId, x, y) {
    var meme = getMeme()
    var photo = getImg(imgId)
    console.log(photo);
    let img = new Image()
    img.src = 'img/' + photo.url
    console.log(img);

    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    meme.lines.map(line => drawText(line))
}



function onSaveText(text) {

    saveText(text)
    renderCanvas(getImgId())
}

function drawText(line) {
    const text = gCtx.measureText(`${line.txt}`)
    const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
    let rectX
    let textX
    if (line.align === 'right'){
        textX = gElCanvas.width
        rectX = textX - text.width
    } 
    if (line.align === 'left') {
        textX = 0
        rectX = 0
    }
        if (line.align === 'center') {
            textX = center.x
            rectX = textX - text.width / 2
        }
        gCtx.lineWidth = 2;
        gCtx.strokeStyle = line.stroke;
        gCtx.fillStyle = line.color;
        gCtx.font = `${line.size}px Impact`
        console.log(gCtx.textAlign);
        gCtx.textAlign = `${line.align}`;
        console.log(line.pos.y);
        gCtx.fillText(`${line.txt}`, textX, line.pos.y);
        gCtx.strokeText(`${line.txt}`, textX, line.pos.y);
        console.log(text.width);
        drawRect(rectX, line.pos.y - line.size, text.width + 15, line.size + 10)
    }

    function drawRect(x, y, w, h) {
        gCtx.strokeStyle = 'black'
        gCtx.strokeRect(x, y, w, h)
    }

    function onDeleteLine() {
        deleteLine()
        renderCanvas(getImgId())
    }

    function onAddAnotherLine() {
        if (gAddClick === 0) return
        gAddClick--
        addAnotherLine()
        renderCanvas(getImgId())
    }

    function onSwapLines() {
        swapSelectedLine()
        renderCanvas(getImgId())
    }

    function onChangeTextColor(color) {
        saveColor(color)
        renderCanvas(getImgId())
    }

    function onChangeStrokeColor(strokeClr) {
        saveStroke(strokeClr)
        renderCanvas(getImgId())
    }

    function onChangeFont(font) {
        saveFont(font)
        renderCanvas(getImgId())
    }

    function onChangeFontSize(op) {
        setFontSize(op)
        renderCanvas(getImgId())
        renderCanvas(getImgId())
    }

    function onAlignText(dir) {
        setDirection(dir)
        renderCanvas(getImgId())
    }