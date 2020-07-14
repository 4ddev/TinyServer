class BiMap{
    constructor(){
        this.array = new Array();
    }

    put( e,y ){
        this.array[e] = y;
    }

    get(e){
        return this.array[e];
    }

    remove(e){
        try {
            if( e !== null ){
                //this.array[e].remove();
                this.array.splice(this.array.indexOf(e),1);
                return true;
            }
            return false;
        } catch (e) {
            return false;
        }
    }

    getAll(){
        return this.array;
    }
    size(){
        return Object.keys(this.array).length;
    }
}

module.exports = {
    BiMap: BiMap
}