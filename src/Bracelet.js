import Item from "./Item";

export default class Bracelet extends Item{
    
    constructor(id, name, price, color, type, image, amount, status, size) {
        super('3', id, name, price, color, type, image, amount, status);
        
        //an array - like ['S','M','L'] 
        this.size = size;
        
        //integer - how many sold
        this.sold = 0;
    }

    getSize() {
        return this.size;
    }

    setSize(size) {
        this.size = size;
    }

    getSold() {
        return this.sold;
    }

    setSold(sold) {
        this.sold = sold;
    }
}