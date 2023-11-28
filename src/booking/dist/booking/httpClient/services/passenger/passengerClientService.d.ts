import { PassengerDto } from 'building-blocks/contracts/passengerContract';
export interface IPassengerClientService {
    getPassengerById(id: number): Promise<PassengerDto>;
}
export declare class PassengerClientService implements IPassengerClientService {
    private passengerUrl;
    getPassengerById(id: number): Promise<PassengerDto>;
}
