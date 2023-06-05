import Item from "./Item";

export default class Earings extends Item{
    
    constructor(id, name, price, color, type, image, style, amount, status, sold) {
        super('4', id, name, price, color, type, image, amount, status);
        
        //an array - like ['צמודים','נופלים'] 
        this.style = style;

        //integer - how many sold
        this.sold = 0;
    }

    getStyle() {
        return this.style;
    }

    setStyle(style) {
        this.style = style;
    }

    getSold() {
        return this.sold;
    }

    setSold(sold) {
        this.sold = sold;
    }
}