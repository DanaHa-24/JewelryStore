import Item from "./Item";

export default class Ring extends Item{
    
    constructor(id, name, price, color, type, image, size, amount, status, sold) {
        super('1', id, name, price, color, type, image, amount, status);
        
        //an array - like ['16','17','18','19'] 
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