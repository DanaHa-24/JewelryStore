import Item from "./Item";

export default class Bracelet extends Item{
    
    constructor(id, name, price, color, type, image, status, size) {
        super('typePrefix', id, name, price, color, type, image, status);
        
        //an array - like ['S','M','L'] 
        this.size = size;
    }

    getSize() {
        return this.size;
    }

    setSize(size) {
        this.size = size;
    }
}