import Item from "./Item";

export default class Necklace extends Item{
    constructor(id, name, price, color, type, image, length, status) {
        super('typePrefix', id, name, price, color, type, image, status);
        
        //an array - like ['S','M','L'] 
        this.length = length;
    }

    getLength() {
        return this.length;
    }

    setLength(length) {
        this.length = length;
    }
}