'use-strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    renderGallery()
}


function resizeAndRenderCanvas(imgId) {
    var photo = getImg(imgId)
    const img = new Image();
    // console.log(photo.img.url);
    img.src = 'img/' + photo.url;
    var ratio = img.naturalHeight / img.naturalWidth;
    let imgHeight = img.naturalHeight
    let imgWidth = img.naturalWidth;
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = (elContainer.offsetWidth*imgHeight)/imgWidth
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}

function onToggleGallery() {
    document.querySelector('.meme-editor-container').classList.add('hidden')
    document.querySelector('.image-gallery-container').classList.remove('hidden')
}

function onToggleMemeEditor(imgId) {
    document.querySelector('.meme-editor-container').classList.remove('hidden')
    document.querySelector('.image-gallery-container').classList.add('hidden')

    resizeAndRenderCanvas(imgId)

}

function renderGallery() {
    let imgs = getImgs()
    strHTML = imgs.map(img => {
        return `
        <article class="img-card">
        <img onclick="onToggleMemeEditor(${img.id})" class="photo" src="img/${img.url}" alt="">
        </article>
        `
    }).join('')
    document.querySelector('.image-container').innerHTML = strHTML
}
