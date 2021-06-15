const Store = require('electron-store')

class Storage extends Store{
    constructor(settings){
        super(settings)
        this.password = null
        this.email = null
        this.name  = null
    }
}