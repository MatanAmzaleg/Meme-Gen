'use strict'

let gAddClick = 1


function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
    renderCanvas(getImgId())

}

function renderCanvas(imgId, x, y) {
    var meme = getMeme()
    var photo = getImg(imgId)
    let img = new Image()
    img.src = 'img/' + photo.url

    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    meme.lines.map(line => drawText(line))
}








function addListeners() {
    addMouseListeners()
    addTouchListeners()
    //Listen for resize ev 
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderCanvas()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    console.log('Im from onDown')
    const pos = getEvPos(ev)
    if (!isTextClicked(pos)) return
    setIsTextClicked(true)
    gCtx.beginPath()
    document.body.style.cursor = 'grabbing'

}

function onMove(ev) {
    console.log('Im from onMove')
    if (!getIsTextClicked()) return
    console.log('in pos')
    const pos = getEvPos(ev)
    let line = getCurrLine()
    drawText(line, ev.offsetX, ev.offsetY, pos)
}


function onUp() {
    setIsTextClicked(false)
    document.body.style.cursor = 'grab'
}


function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        //Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}











function onSaveText(text) {

    saveText(text)
    renderCanvas(getImgId())
}

function drawText(line, x) {
    const text = gCtx.measureText(`${line.txt}`)
    const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
    let rectX
    let textX
    if (x) textX = x
    // if(y) 
    if (line.align === 'right') {
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
    saveWidthAndX(text.width, textX)
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = line.stroke;
    gCtx.fillStyle = line.color;
    gCtx.font = `${line.size}px Impact`
    gCtx.textAlign = `${line.align}`;
    console.log(line.pos.y);
    gCtx.fillText(`${line.txt}`, textX, line.pos.y);
    gCtx.strokeText(`${line.txt}`, textX, line.pos.y);
    drawRect(rectX, line.pos.y - line.size, text.width + 15, line.size + 10)
    console.log(text.width);
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
    document.querySelector('.meme-text').value = ''
    document.querySelector('.meme-text').placeholder = getMeme().lines[getCurrLine()].txt
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

function onSaveMeme(){
    saveMeme()
}







function downloadCanvas(elLink) {
    // Gets the canvas content and convert it to base64 data URL that can be save as an image
    const data = gElCanvas.toDataURL(/* DEFAULT: 'image/png'*/) // Method returns a data URL containing a representation of the image in the format specified by the type parameter.
    console.log('data', data) // Decoded the image to base64 
    elLink.href = data // Put it on the link
    elLink.download = 'my-img' // Can change the name of the file
}










function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
  }
  
  // CallBack func will run on success load of the img
  function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    // After we read the file
    reader.onload = function (event) {
      let img = new Image() // Create a new html img element
      img.src = event.target.result // Set the img src to the img file we read
      // Run the callBack func, To render the img on the canvas
      img.onload = onImageReady.bind(null, img)
      // Can also do it this way:
      // img.onload = () => onImageReady(img)
    }
    reader.readAsDataURL(ev.target.files[0]) // Read the file we picked
  }