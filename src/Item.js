export default class Item{
    
    constructor(typePrefix, id, name, price, color, type, image, status){
        //integer - prefix for each jewelry types
        this.typePrefix = typePrefix;
    
        //an id like - 1-001 for necklace and 2-001 for bracelet
        this.id = '${typePrefix}-${id}';

        //string
        this.name = name;

        //integer
        this.price = price;

        //string
        this.color = color;

        //an array like - ['beads','pearl','macrame']
        this.type = type;

        //url as a string
        this.image = image;

        this.status = status;
    }

    getId() {
        return this.id;
    }
    
    setId(id) {
        this.id = id;
    }
    
    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getPrice() {
        return this.price;
    }

    setPrice(price) {
        this.price = price;
    }

    getColor() {
        return this.color;
    }

    setColor(color) {
        this.color = color;
    }

    getType() {
        return this.type;
    }

    setType(type) {
        this.type = type;
    }

    getImage() {
        return this.image;
    }

    setImage(image) {
        this.image = image;
    }

    getStatus() {
        return this.status;
    }

    setStatus(status) {
        this.status = status;
    }
}