import Item from "./Item";

export default class Ring extends Item{
    
    constructor(id, name, price, color, type, image, size, amount, status) {
        super('1', id, name, price, color, type, image, amount, status);
        
        //an array - like ['16','17','18','19'] 
        this.size = size;
    }

    getSize() {
        return this.size;
    }

    setSize(size) {
        this.size = size;
    }  
}