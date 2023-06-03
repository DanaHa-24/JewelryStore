import Address from "./Address";
import User from "./user";

export default class GeneralUser extends User{
    constructor(fName, lName, password, userMail, phoneNumber, addresses, orderHistory, numOfOrders, myWishList, MyCart){
        super(fName, lName, 'general', password, userMail, phoneNumber);
        
        //an array of addresses (class) - user's full address
        this.addresses = addresses;

        //an array of previous user's orders
        this.orderHistory = orderHistory;

        //integer - num of previous user's orders
        this.numOfOrders = numOfOrders;

        //an array of user's WishListItems 
        this.myWishList = myWishList;

        //an array of user's CartItems
        this.MyCart = MyCart;
    }

    getAddress() {
        return this.address;
    }

    setAddress(address) {
        this.address = address;
    }

    getOrderHistory() {
        return this.orderHistory;
    }

    setOrderHistory(orderHistory) {
        this.orderHistory = orderHistory;
    }

    getNumOfOrders() {
        return this.numOfOrders;
    }

    setNumOfOrders(numOfOrders) {
        this.numOfOrders = numOfOrders;
    }

    getMyWishList() {
        return this.myWishList;
    }

    setMyWishList(myWishList) {
        this.myWishList = myWishList;
    }

    getMyCart() {
        return this.MyCart;
    }

    setMyCart(MyCart) {
        this.MyCart = MyCart;
    }

    addAddress(city, street, houseNum, apartmentNum, postalCode) {
        const newAddress = new Address(city, street, houseNum, apartmentNum, postalCode);
        this.addresses.push(newAddress);
    }

    //to complete
    editAddress(){

    }

    //to complete
    deleteAddress(){

    }
}