import { FlightDto, ReserveSeatRequestDto, SeatDto } from 'building-blocks/contracts/flightContract';
export interface IFlightClientService {
    getFlightById(id: number): Promise<FlightDto>;
    getAvalibaleSeats(flightId: number): Promise<SeatDto[]>;
    reserveSeat(request: ReserveSeatRequestDto): Promise<void>;
}
export declare class FlightClientService implements IFlightClientService {
    private flightUrl;
    getFlightById(id: number): Promise<FlightDto>;
    getAvalibaleSeats(flightId: number): Promise<SeatDto[]>;
    reserveSeat(request: ReserveSeatRequestDto): Promise<void>;
}
