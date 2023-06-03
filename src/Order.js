export default class Order{
    constructor(orderNum, orderItems, numOfItems, sum, state, userMail){
        //integer - uniqe number
        this.orderNum = orderNum;

        //an array of items
        this.orderItems = orderItems;

        //integer - how many items sell
        this.numOfItems = numOfItems;

        //integer - order's sum
        this.sum = sum;

        //string - order's state like ['הזמנה ממתינה','הזמנה נמסרה','הזמנה בתהליך','הזמנה התקבלה','הזמנה נשלחה']
        //the order gets 1 state at a time - the function will change it
        this.state = state;

        //string - to connect each order to it's buyer
        this.userMail = userMail;
    }

    getOrderNum() {
        return this.orderNum;
    }

    setOrderNum(orderNum) {
        this.orderNum = orderNum;
    }

    getOrderItems() {
        return this.orderItems;
    }

    setOrderItems(orderItems) {
        this.orderItems = orderItems;
    }

    getNumOfItems() {
        return this.numOfItems;
    }

    setNumOfItems(numOfItems) {
        this.numOfItems = numOfItems;
    }

    getSum() {
        return this.sum;
    }

    setSum(sum) {
        this.sum = sum;
    }

    getState() {
        return this.state;
    }

    setState(state) {
        this.state = state;
    }

    getUserMail() {
        return this.userMail;
    }

    setUserMail(userMail) {
        this.userMail = userMail;
    }
}