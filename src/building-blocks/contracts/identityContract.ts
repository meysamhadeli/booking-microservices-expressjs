import { IEvent } from '../types/core/event';

export class UserCreated implements IEvent {
  id: number;
  name: string;
  passportNumber: string;

  constructor(partial?: Partial<UserCreated>) {
    Object.assign(this, partial);
  }
}
