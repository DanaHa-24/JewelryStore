import User from "./user";

export default class GeneralUser extends User{
    constructor(fName, lName, password, userMail, phoneNumber){
        super(fName, lName, 'supplier', password, userMail, phoneNumber);
    }
}