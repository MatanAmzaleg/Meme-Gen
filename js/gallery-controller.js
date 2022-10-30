'use-strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    addListeners()
    renderGallery()
}

function onFilterMemes(cat) {
    console.log(cat);
    var size = changeFilter(cat)
    document.querySelector(`.${cat}`).style.fontSize = 16 + 2 * size + 'px'
    let imgs = getImgs()
    var filteredImgs = imgs.filter(img => img.keywords.includes(cat))
    console.log(filteredImgs);
    renderGallery(filteredImgs)
}


function onToggleGallery() {
    document.querySelector('.saved-memes-section').classList.add('hidden')
    document.querySelector('.meme-editor-container').classList.add('hidden')
    document.querySelector('.image-gallery-container').classList.remove('hidden')
    updateAddClick()
    resetMeme()
}

function onToggleMemeEditor(imgId) {
    document.querySelector('.saved-memes-section').classList.add('hidden')
    document.querySelector('.meme-editor-container').classList.remove('hidden')
    document.querySelector('.image-gallery-container').classList.add('hidden')
    saveImgId(imgId)
    resizeCanvas(imgId)
    renderCanvas(imgId)
}

function onToggleSavedMemes() {

    document.querySelector('.saved-memes-section').classList.remove('hidden')
    document.querySelector('.meme-editor-container').classList.add('hidden')
    document.querySelector('.image-gallery-container').classList.add('hidden')
    renderSavedMemes()
}

function onToggleMenu() {
    document.body.classList.toggle('menu-open')
}

function onToggleModal(){
    document.body.classList.toggle('modal-open')
}

function renderSavedMemes(){
    let savedMemes = getMemes()
    var strHTML = savedMemes.map(meme=> {
        var imgId = meme.selectedImgId;
        imgUrl = getImg(imgId).url;
        keywords = getImg(imgId).keywords;
        console.log(meme);
        return `
        <div onclick="onRenderMeme(this.dataset.id)" data-id="${meme.selectedImgId}" class="work ">
        <h3 class='movie-title'>Title: ${meme.title}</h3>
        <img src="img/${imgUrl}" alt="">
        <p class="release-date">keyWords : ${keywords}</p>
      </div>
        `
    }).join('')
    document.querySelector('.saved-memes-section').innerHTML = strHTML
}

function onRenderMeme(memeId){
    console.log(memeId);
    document.querySelector('.saved-memes-section').classList.add('hidden')
    document.querySelector('.meme-editor-container').classList.remove('hidden')
    document.querySelector('.image-gallery-container').classList.add('hidden')
    renderMemeFromWorks(memeId)
}

function renderGallery(photos) {
    if (photos) {
        strHTML = photos.map(img => {
            return `
            <article class="img-card">
            <img onclick="onToggleMemeEditor(${img.id})" class="photo" src="img/${img.url}" alt="">
            </article>
            `
        }).join('')
    } else {
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

function onTextFilterMeme(text) {
    let imgs = getImgs()
    let photos = imgs.filter(photo => photo.keywords.some((keyword) => keyword.includes(text)))
    renderGallery(photos)
}

function onFlexible() {
    let imgs = getImgs()
    let rnd = getRandomIntInclusive(0, imgs.length - 1)
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