export default class User{
   constructor(fName, lName, permission, password, userMail, phoneNumber){
        //string - user's first name
        this.fName = fName;

        //string - user's last name
        this.lName = lName;

        //string - user's permission can be ['admin','supplier','general']
        this.permission = permission;

        //string - user's password needs to be encrypted (not clear text)
        this.password = password;

        //string - user's mail address - need to validate it
        //will be his username
        this.userMail = userMail;

        //string - user's phone number
        this.phoneNumber = phoneNumber;
   } 

    getFName() {
        return this.fName;
    }

    setFName(fName) {
        this.fName = fName;
    }

    getLName() {
        return this.lName;
    }

    setLName(lName) {
        this.lName = lName;
    }

    getPermission() {
        return this.permission;
    }

    setPermission(permission) {
        this.permission = permission;
    }

    getPassword() {
        return this.password;
    }

    setPassword(password) {
        this.password = password;
    }

    getUserMail() {
        return this.userMail;
    }

    setUserMail(userMail) {
        this.userMail = userMail;
    }

    getPhoneNumber() {
        return this.phoneNumber;
    }

    setPhoneNumber(phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}