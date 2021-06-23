function BuildTree(folder, include_in){
    folder.forEach(file => {
        id_subfolder += 1
        let li       = document.createElement('li')
        let name     = document.createElement("a")
        let i_icon   = document.createElement('i')
        
        let name_str = document.createTextNode(file.name)
        name.appendChild(name_str)
        
        if(file.type === "file"){
            name.addEventListener('click', async (event) => {   // EventListener sur les fichiers du dossier
                const file_content = await ipcRenderer.invoke("app:get-file", file.path)
                folder_datas_buffer = file
                if(file_content){
                    document.getElementById('editor-text-content').value = file_content
                }
            } )
            name.setAttribute('class', 'file-tree-text')
            name.appendChild(name_str)
            li.appendChild(name)
            include_in.appendChild(li)
        }else{
            i_icon.setAttribute('class', 'fas fa-angle-right mt-1 ml-5')
            
            name.setAttribute('id', 'btn-folder-' + file.name.replaceAll(' ', '_') + id_subfolder)
            name.setAttribute('data-bs-toggle', 'collapse')
            name.setAttribute('href', '#' + file.name.replaceAll(' ', '_') + id_subfolder)
            name.setAttribute('role', 'button')
            name.setAttribute('aria-expanded', false)
            name.setAttribute('aria-controls', 'folder-' + file.name.replaceAll(' ', '_') + id_subfolder)
            name.setAttribute('data-bs-target', '#folder-' + file.name.replaceAll(' ', '_') + id_subfolder)
            
            li.appendChild(i_icon)
            li.appendChild(name)
            include_in.appendChild(li)

            // Folder files
            let ul = document.createElement('ul')
            ul.setAttribute('id', 'folder-' + file.name.replaceAll(' ', '_') + id_subfolder)
            ul.setAttribute('class', 'collapse')
            li.appendChild(ul)
            BuildTree(file.children, ul)
        }
    })
}

module.exports = {BuildTree}  