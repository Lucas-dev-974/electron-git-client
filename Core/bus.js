const { ipcMain, dialog } = require('electron')
const dirTree = require("directory-tree");
const fs   = require('fs');

const simpleGit = require('simple-git');


ipcMain.handle('app:open-dialog', async function(event){
    let folder_path = dialog.showOpenDialogSync({ properties: ['openDirectory'] })[0]
    if(folder_path !== "undefined"){
        console.log('bus dir path: ' + global.__dirname);
        let tree = dirTree(folder_path)
        if(tree !== null){
            return tree
        }
    }
})

ipcMain.handle('app:get-file', async function(event, file_path){
    const content = fs.readFileSync(file_path, 'utf8')
    return content
})

ipcMain.handle('app:save-file', async(event, file) => {
    fs.writeFile(file.path, file.content, 'utf8', function(err){
        if(err) throw err
        return true
    })
})


ipcMain.handle('git:is-git-directory', async(event, folder_path) => {
    let is_repo = false
    let files = fs.readdirSync(folder_path)
    files.forEach(file => {
        if(file === ".git") is_repo = true
    })
    return is_repo
})
