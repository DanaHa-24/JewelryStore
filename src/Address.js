
export default class Address{
    constructor(name, city, street, houseNum, apartmentNum, postalCode){
        //string - nickname for the specific address
        this.name = name;

        //string
        this.city = city;

        //string
        this.street = street;

        //integer
        this.houseNum = houseNum;

        //integer
        this.apartmentNum = apartmentNum;

        //integer
        this.postalCode = postalCode;
    }
    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getCity() {
        return this.city;
    }

    setCity(city) {
        this.city = city;
    } 

    getStreet() {
        return this.street;
    }

    setStreet(street) {
        this.street = street;
    } 

    getHouseNum() {
        return this.houseNum;
    }

    setHouseNum(houseNum) {
        this.houseNum = houseNum;
    } 

    getApartmentNum() {
        return this.apartmentNum;
    }

    setApartmentNum(apartmentNum) {
        this.apartmentNum = apartmentNum;
    }
    
    getPostalCode() {
        return this.postalCode;
    }

    setPostalCode(postalCode) {
        this.postalCode = postalCode;
    } 
}
       