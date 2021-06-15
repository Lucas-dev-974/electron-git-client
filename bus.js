const { ipcMain, dialog, remote } = require('electron')
const Window = require('./Window')
const dirTree = require("directory-tree");
const fs   = require('fs')


ipcMain.handle('app:open-dialog', async function(event){
    let folder_path = dialog.showOpenDialogSync({ properties: ['openDirectory'] })[0]
    if(folder_path !== "undefined"){
        console.log(folder_path);
        let tree = dirTree(folder_path)
        if(tree !== null){
            return tree
        }
    }
})

ipcMain.handle('app:get-file', async function(event, file_path){
    console.log(file_path);
    const content = fs.readFileSync(file_path, 'utf8')
    return content
})
