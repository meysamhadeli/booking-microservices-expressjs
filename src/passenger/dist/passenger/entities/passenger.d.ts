import { PassengerType } from '../enums/passengerType';
export declare class Passenger {
    id: number;
    name: string;
    passportNumber: string;
    age: number;
    passengerType: PassengerType;
    createdAt: Date;
    updatedAt?: Date | null;
    constructor(partial?: Partial<Passenger>);
}
