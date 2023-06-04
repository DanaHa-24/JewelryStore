import Item from "./Item";

export default class Earings extends Item{
    
    constructor(id, name, price, color, type, image, style, amount, status) {
        super('4', id, name, price, color, type, image, amount, status);
        
        //an array - like ['צמודים','נופלים'] 
        this.style = style;
    }

    getStyle() {
        return this.style;
    }

    setStyle(style) {
        this.style = style;
    }
}