import CartItem from "./cartItem";

export default class WishListItem extends CartItem{
    constructor(name, price, amount){
        super(name, price, amount, image);

        //boolean - if is it in user's wishList for identification
        this.wish = true;
    }

    getWish() {
        return this.wish;
    }

    setWish(wish) {
        this.wish = wish;
    }
}