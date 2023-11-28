import { PassengerType } from "../enums/passengerType";
export declare class PassengerDto {
    id: number;
    name: string;
    age: number;
    passportNumber: string;
    passportType: PassengerType;
    createdAt: Date;
    updatedAt?: Date;
}
