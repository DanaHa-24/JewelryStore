import Item from "./Item";

export default class Bracelet extends Item{
    
    constructor(id, name, price, color, type, image, amount, status, size) {
        super('3', id, name, price, color, type, image, amount, status);
        
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