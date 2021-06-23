
// Toutes ou presque, variables utilisé ici a été initialiser dans home.js

git_init_btns.addEventListener('click', function(){
    console.log(id_subfolder);
    git_utils.Init_repo()
})

editor_content.addEventListener('keydown', async function(e){
    if(e.key == 's' && e.ctrlKey){
        let file = {
            path: folder_datas_buffer.path,
            content: editor_content.value
        }
        await ipcRenderer.invoke('app:save-file', file)
    }
}, false)

