const { BrowserWindow  } = require('electron')

const default_props = {
    width: 720,
    heihgt: 480,
    show: false,
    webPreferences: {
        nodeIntegration: true,
    }
}

class Window extends BrowserWindow{
    constructor({file, ...WindowSettings}){
        super({...default_props, ...WindowSettings})
        this.loadFile(file)
        
        this.webContents.openDevTools()
        this.once('ready-to-show', () => {
            this.show()
        })
    }
}
module.exports = Window