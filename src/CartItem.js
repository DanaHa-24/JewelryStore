export default class CartItem{
    constructor(name, price, amount, image){
        //string
        this.name = name;

        //integer - per 1 unit
        this.price = price;
        
        //integer - how much from specific item user put in the cart
        this.amount = amount;
        
        //url as a string
        this.image = image;
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

    getAmount() {
        return this.amount;
    }

    setAmount(amount) {
        this.amount = amount;
    }

    getImage() {
        return this.image;
    }

    setImage(image) {
        this.image = image;
    }
}