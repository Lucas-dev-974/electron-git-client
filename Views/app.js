const { ipcRenderer, ipcMain } = require('electron')
// let is_git_repo = false
const TreeFc = require('./core/FilesTreeFunctions')

const GitUtils = require('./core/GitUtils')

let id_subfolder = 0
let folder_datas_buffer = [] // Buffer save filez

let tree_content    = document.getElementById('folder-tree')
let git_init_btns   = document.getElementById('git-init-btns')
let git_icon_add_remote = document.getElementById('git-add-remote')
let git_status_btns = document.getElementById('git_status_btns') 
let git_input_top   = document.getElementById('git-input-top')
let editor_content  = document.getElementById('editor-text-content')
// let selector_folder_icon
let git_utils = null

git_init_btns.style.display = 'none'
git_status_btns.style.display = 'none'

document.getElementById('open_folder').addEventListener('click', async () => { // EventListener Choisir un dossier
    const folder_datas = await ipcRenderer.invoke('app:open-dialog') // Choose file in File Explorer and get these files
    git_utils = new GitUtils(folder_datas.path)
    await git_utils.InitGitBtns({
        'git_init_btns': git_init_btns,
        'git_status_btns': git_status_btns,
        'git_icon_add_remote': git_icon_add_remote
    })

    require('./core/EventListener')

    if(folder_datas){   // Si il y'a des données dans le dossier donner
        tree_content.innerHTML = ''
        
        let ul     = document.createElement('ul')
        let ul_sub = document.createElement('ul')
        let li     = document.createElement('li')
        let i_icon = document.createElement('i')
        let a      = document.createElement('a')

        ul.setAttribute('id',        'root-folder-tree')
        i_icon.setAttribute('class', 'fas fa-angle-right ')

        a.setAttribute('data-bs-toggle', 'collapse')
        a.setAttribute('href', '#' + folder_datas.name.replaceAll(' ', '_'))
        a.setAttribute('role', 'button')
        a.setAttribute('aria-expanded', false)
        a.setAttribute('aria-controls', 'folder-'   + folder_datas.name.replaceAll(' ', '_'))
        a.setAttribute('data-bs-target', '#folder-' + folder_datas.name.replaceAll(' ', '_'))
        // a.setAttribute('class', 'selector-folder-icon')
        
        a.appendChild(i_icon)
        a.appendChild(document.createTextNode(folder_datas.name))
        li.appendChild(a)
        ul.appendChild(li)

        ul_sub.setAttribute('id', 'folder-' + folder_datas.name.replaceAll(' ', '_'))
        ul_sub.setAttribute('class', 'collapse')
        
        TreeFc.BuildTree(folder_datas.children, ul_sub)

        li.appendChild(ul_sub)
        tree_content.appendChild(ul)
    }
})




