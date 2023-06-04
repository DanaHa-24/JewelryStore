import Item from "./Item";

export default class Necklace extends Item{
    constructor(id, name, price, color, type, image, style, status) {
        super('2', id, name, price, color, type, image, status);
        
        //an array - like ['....','נופל','צוק'ר'] 
        this.style = style;
    }

    getStyle() {
        return this.style;
    }

    setStyle(style) {
        this.style = style;
    }
}