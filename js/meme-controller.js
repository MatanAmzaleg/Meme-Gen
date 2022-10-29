'use strict'

let gAddClick = 1

function updateAddClick(){
    gAddClick++
}


function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    transferCanvasSize(gElCanvas.width, gElCanvas.height)
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
    renderCanvas(getImgId())
    
}

function onDrawImg(img){
    console.log(img.src);
    saveSticker(img.src, img.height, img.width)
    gCtx.drawImage(img, gElCanvas.width/2, gElCanvas.height/2, img.width/1.5, img.height/1.5)
}

function renderCanvas(imgId, selMeme) {
    var meme = getMeme()
    var photo = getImg(+imgId)
    let img = new Image()
    img.src = 'img/' + photo.url
    
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    if(selMeme){
        selMeme.lines.map(line => drawText(line))
    }else   meme.lines.map(line => drawText(line))
}
  


function renderMemeFromWorks(memeId){
    var memes = getMemes()
    var selMeme = memes.find(meme => meme.selectedImgId === +memeId)
    // resizeCanvas()
    renderCanvas(memeId, selMeme)
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
    if(isStickerClicked(pos)){
        console.log('stickerClicked');
        setIsImgClicked(true)
    } 
    if (!isTextClicked(pos)) return
    setIsTextClicked(true)
    gCtx.beginPath()
    document.body.style.cursor = 'grabbing'

}

function onMove(ev) {
    console.log('Im from onMove')
    if (!getIsTextClicked()) return
    const pos = getEvPos(ev)
    console.log(pos);
    var line = getMeme().lines[getCurrLine()]
    updatePos(pos)
    renderCanvas(getImgId())
    drawText(line)
    
}


function onUp() {
    setIsTextClicked(false)
    document.body.style.cursor = 'auto'
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

function drawText(line) {
    console.log(line);
    const text = gCtx.measureText(`${line.txt}`)
    const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
    let rectX = line.pos.x
    let textX = line.pos.x
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
    saveWidth(text.width)
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = line.stroke;
    gCtx.fillStyle = line.color;
    gCtx.font = `${line.size}px ${line.font}`
    gCtx.textAlign = `${line.align}`;
    console.log(line.pos.x);
    gCtx.fillText(`${line.txt}`, line.pos.x, line.pos.y);
    gCtx.strokeText(`${line.txt}`, line.pos.x, line.pos.y);
    // drawRect(rectX, line.pos.y - line.size, text.width + 15, line.size + 10)
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
    onToggleSavedMemes()
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