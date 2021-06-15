const path = require('path')
const { app, ipcMain, dialog } = require('electron')

const fs = require('fs')
const Window = require('./Window')
const Store  = require('./Store')

require('./bus')
require('electron-reload')(__dirname)

function main(){
    let MainWin = new Window({
        file: path.join('Views', 'home.html'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableremotemodule: true,
        },
        preload: 'preload.js'
    })

    ipcMain.on('test-event', (event, arg) => {
        console.log('okokok')
    })
}




app.on('ready', main)
app.on('window-all-closed', ()=>{
    app.quit()
})