import User from "./user";

export default class AdminUser extends User{
    constructor(fName, lName, password, userMail, phoneNumber){
        //maybe here we need to encrypt user's password?
        super(fName, lName, 'admin', password, userMail, phoneNumber);
    }
}
