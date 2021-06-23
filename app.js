const path = require('path')
const { app, ipcMain } = require('electron')

const Window = require('./Core/Window')
const Store  = require('./Core/Store')

require('./Core/bus')
require('electron-reload')

// Define main path
global.__dirname = __dirname

function main(){
    let MainWin = new Window({
        file: path.join('Views', 'app.html'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableremotemodule: true,
        },
        preload: 'preload.js'
    })
}

app.on('ready', main)
app.on('window-all-closed', ()=>{
    app.quit()
})