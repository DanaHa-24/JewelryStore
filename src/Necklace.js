import Item from "./Item";

export default class Necklace extends Item{
    constructor(id, name, price, color, type, image, style, status) {
        super('2', id, name, price, color, type, image, amount, status);
        
        //an array - like ['....','נופל','צוק'ר'] 
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