import {IEvent} from "../types/core/event";

export class UserCreated implements IEvent {
    id: number;
    name: string;
    passportNumber: string;

    constructor(id?: number, name?: string, passportNumber?: string) {
        this.id = id ?? 0;
        this.name = name ?? '';
        this.passportNumber = passportNumber ?? '';
    }
}
