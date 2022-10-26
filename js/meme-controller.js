'use strict'

function onSaveSettings(ev){
    ev.preventDefault()
    // const elInputs = document.querySelectorAll('.input')
    // const userSettings = {}
    // elInputs.forEach(input => userSettings[input.name] = input.value)
    // saveSettings(userSettings)
}

function onPaintClick(){
    const eyeDropper = new EyeDropper()
    eyeDropper.open()
}