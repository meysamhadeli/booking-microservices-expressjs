import { Flight } from '../../flight/entities/flight';
export declare class Aircraft {
    id: number;
    name: string;
    model: string;
    manufacturingYear: number;
    createdAt: Date;
    updatedAt?: Date | null;
    flights: Flight[];
    constructor(partial?: Partial<Aircraft>);
}
