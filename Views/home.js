const { dialog, ipcRenderer } = require('electron')

const path = require('path');
const fs = require('fs');

const directoryPath = path.join(__dirname, './');
console.log(directoryPath);


let Folders = []
let nodes   = []

let tree_content = document.getElementById("folder-tree")

// Event Listener
document.getElementById('open_folder').addEventListener('click', async () => { // Choisir un dossier
    const folder_datas = await ipcRenderer.invoke('app:open-dialog')
    document.getElementById('folder-tree').innerHTML = ''
    if(folder_datas){
        document.getElementById('folder-name').innerHTML = folder_datas.name
        show_file(folder_datas.children, 'folder-tree')
        show_folder(Folders, 'folder-tree')
        tree_content.appendChild(nodes[0])
    }
})


function show_file(folder_datas, dom_content, reset = false){ // List les fichiers du dossier
    
    let ul = document.createElement('ul')
    ul.setAttribute('id', 'single-file')
    nodes.push(ul)

    folder_datas.forEach(file => {
        if(file.type === "file"){
            let li = document.createElement('li')
            let name = document.createElement("a")
            let name_str = document.createTextNode(file.name)

            name.addEventListener('click', async (event) => {
                const file_content = await ipcRenderer.invoke("app:get-file", file.path)
                if(file_content){
                    document.getElementById('editor-text').innerHTML = file_content
                }
            } )
            // li.setAttribute('class', )
            name.setAttribute('class', 'file-tree-text')

            name.appendChild(name_str)
            li.appendChild(name)
            ul.appendChild(li)
        }else{
            Folders.push(file)
        }
    })  
    // tree_content.appendChild(ul)
}

function show_folder(folder_datas, dom_content){ // List les dossiers et fichiers des sous-dossiers
    Folders = [] // Reset des sous-dossier
    let tree_content = document.getElementById(dom_content)
    
    folder_datas.forEach(folder => {
        let div = document.createElement('div')
        let ul = document.createElement('ul')
        let folder_name = document.createElement('a')
        let folder_name_str = document.createTextNode(folder.name)
        
        // Toggle
        folder_name.setAttribute('data-bs-toggle', 'collapse')
        folder_name.setAttribute('href', '#' + folder.name.replace(' ', '_'))
        folder_name.setAttribute('role', 'button')
        folder_name.setAttribute('aria-expanded', false)
        folder_name.setAttribute('aria-controls', 'folder-' + folder.name.replace(' ', '_'))
        folder_name.setAttribute('data-bs-target', '#folder-' + folder.name.replace(' ', '_'))

        folder_name.appendChild(folder_name_str)
        div.appendChild(folder_name)

        ul.setAttribute('class', "collapse multi-collapse")
        ul.setAttribute('id', 'folder-' + folder.name.replace(' ', '_'))

        folder.children.forEach(file => {
            if(file.type === "file"){
                let li = document.createElement('li')
                let name = document.createElement("p")
                let name_str = document.createTextNode(file.name)
                
                name.setAttribute('class', 'file-tree-text')
                name.addEventListener('click', async (event) => {
                    const file_content = await ipcRenderer.invoke("app:get-file", file.path)
                    if(file_content){
                        document.getElementById('editor-text').innerHTML = file_content
                    }
                } )
                name.appendChild(name_str)
                li.appendChild(name)
                ul.appendChild(li)
            }else{
                Folders.push(file)
            }
        }) 
        div.appendChild(ul)
        tree_content.appendChild(div)

        if(Folders){
            show_folder(Folders, "folder-tree")
        }
    })
    
}
