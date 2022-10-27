'use-strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    addListeners()
    renderGallery()
}

function onFilterMemes(cat){
    console.log(cat);
    var size = changeFilter(cat)
    document.querySelector(`.${cat}`).style.fontSize = 16 + 2*size +'px'
    let imgs = getImgs()
    var filteredImgs = imgs.filter(img => img.keywords.includes(cat))
    console.log(filteredImgs);
    renderGallery(filteredImgs)
}


function onToggleGallery() {
    document.querySelector('.meme-editor-container').classList.add('hidden')
    document.querySelector('.image-gallery-container').classList.remove('hidden')
}

function onToggleMemeEditor(imgId) {
    document.querySelector('.meme-editor-container').classList.remove('hidden')
    document.querySelector('.image-gallery-container').classList.add('hidden')
    saveImgId(imgId)
    resizeCanvas()
    renderCanvas(imgId)
    // renderText(imgId)

}

function renderGallery(photos) {
    if(photos){
        strHTML = photos.map(img => {
            return `
            <article class="img-card">
            <img onclick="onToggleMemeEditor(${img.id})" class="photo" src="img/${img.url}" alt="">
            </article>
            `
        }).join('')
    }else{
    let imgs = getImgs()
    strHTML = imgs.map(img => {
        return `
        <article class="img-card">
        <img onclick="onToggleMemeEditor(${img.id})" class="photo" src="img/${img.url}" alt="">
        </article>
        `
    }).join('')
}
    document.querySelector('.image-container').innerHTML = strHTML
}

function onTextFilterMeme(text){
    let imgs = getImgs()
    let photos = imgs.filter(photo => photo.keywords.some((keyword) => keyword.includes(text)))
    renderGallery(photos)
}

function onFlexible(){
    let imgs = getImgs()
    let rnd = getRandomIntInclusive(0, imgs.length-1)
    var img = imgs[rnd]
    console.log(img);
    onToggleMemeEditor(img.id)
    renderCanvas(img.id)
}


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  }