export interface RentItems{
    id?:Number;
    carId:Number;
    customerId:Number;
    rentDate:Date;
    returnDate?:Date;
    rentStatus:boolean;
}