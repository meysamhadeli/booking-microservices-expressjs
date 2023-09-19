import {PassengerType} from "../enums/passengerType";

export class PassengerDto {
    id: number;
    name: string;
    age: number;
    passportNumber: string;
    passportType: PassengerType;
    createdAt: Date;
    updatedAt?: Date;
}
