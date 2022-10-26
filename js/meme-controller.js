'use strict'

function onSaveSettings(ev){
    ev.preventDefault()
    const elInputs = document.querySelectorAll('.input')
    console.log(elInputs);
    const userSettings = {}
    elInputs.forEach(input => userSettings[input.name] = input.value)
    saveSettings(userSettings)
}

function onRenderText(){
    let memes = getMemes()
    let settings = getSettings()
    console.log(memes.lines[0].size + 'px');
    const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
    gCtx.font = `${memes.lines[0].size}px${settings.font}`
    console.log(settings.font);
    // gCtx.fillText("hello World", center.x, 50)(`${memes.lines}`, center.x, 50)
}
