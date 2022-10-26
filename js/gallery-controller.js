'use-strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')


    resizeCanvas()
    renderCanvas()

    renderGallery()
}


function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    console.log(elContainer.offsetWidth);
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function onToggleGallery(){
    document.querySelector('.meme-editor-container').classList.add('hidden')
    document.querySelector('.image-gallery-container').classList.remove('hidden')
}

function onToggleMemeEditor(){
    document.querySelector('.meme-editor-container').classList.remove('hidden')
    document.querySelector('.image-gallery-container').classList.add('hidden')
    resizeCanvas()
    renderCanvas()
}

function renderGallery(){
    let imgs = getImgs()
    strHTML = imgs.map(img => {
        return `
        <article class="img-card">
        <img class="photo" src="img/${img.url}" alt="">
        </article>
        `
    }).join('')
    document.querySelector('.image-container').innerHTML = strHTML
}

function renderCanvas() {
    let meme 
    if (!meme) {
        gCtx.fillStyle = "black";
        gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height);
        return;
    }
}