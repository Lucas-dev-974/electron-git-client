const { ipcRenderer } = require('electron');
const simpleGit = require('simple-git');

class GitUtil{
    constructor(folder_path, git_url){
        this.folder_path   = folder_path
        this.git_url       = git_url
        this.is_git_folder = false
        this.status = null
        this.git = simpleGit(folder_path, {binary: 'git'})

        
    }
    
    async InitGitBtns(git_btns_top){
        this.is_git_folder = await this.git.checkIsRepo()
        this.git_btns_top = git_btns_top

        console.log("isrepo: " + this.is_git_folder);
        if(this.is_git_folder){
            git_btns_top.git_status_btns.style.display = 'flex'
            git_btns_top.git_init_btns.style.display = 'none'
            git_btns_top.git_icon_add_remote.style.display = 'none'
        }else{
            git_btns_top.git_init_btns.style.display = 'flex'
            git_btns_top.git_status_btns.style.display = 'none'
        }
    }

    async Init_repo(remote){
        console.log('init git repo in git ut');
        await this.git.init()
    }

    async InitState_repo(){

    }
}


module.exports = GitUtil