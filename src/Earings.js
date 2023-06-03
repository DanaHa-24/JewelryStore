import Item from "./Item";

export default class Earings extends Item{
    
    constructor(id, name, price, color, type, image, style, status) {
        super('typePrefix', id, name, price, color, type, image, status);
        
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