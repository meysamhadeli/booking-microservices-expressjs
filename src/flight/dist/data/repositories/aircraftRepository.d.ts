import { Aircraft } from '../../aircraft/entities/aircraft';
export interface IAircraftRepository {
    createAircraft(aircraft: Aircraft): Promise<Aircraft>;
    findAircraftByName(name: string): Promise<Aircraft>;
    getAll(): Promise<Aircraft[]>;
}
export declare class AircraftRepository implements IAircraftRepository {
    private ormRepository;
    constructor();
    createAircraft(aircraft: Aircraft): Promise<Aircraft>;
    findAircraftByName(name: string): Promise<Aircraft>;
    getAll(): Promise<Aircraft[]>;
}
