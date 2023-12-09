export class FlightCreated {
  id: number;
  flightNumber: string;
  price: number;
  flightStatus: FlightStatus;
  flightDate: Date;
  departureDate: Date;
  departureAirportId: number;
  aircraftId: number;
  arriveDate: Date;
  arriveAirportId: number;
  durationMinutes: number;
  createdAt: Date;
  updatedAt?: Date;

  constructor(request: Partial<FlightCreated> = {}) {
    Object.assign(this, request);
  }
}

export class AircraftCreated {
  id: number;
  model: string;
  name: string;
  manufacturingYear: number;
  createdAt: Date;
  updatedAt?: Date;

  constructor(request: Partial<AircraftCreated> = {}) {
    Object.assign(this, request);
  }
}

export class AirportCreated {
  id: number;
  code: string;
  name: string;
  address: string;
  createdAt: Date;
  updatedAt?: Date;

  constructor(request: Partial<AirportCreated> = {}) {
    Object.assign(this, request);
  }
}

export class SeatCreated {
  id: number;
  seatNumber: string;
  seatClass: SeatClass;
  seatType: SeatType;
  flightId: number;
  isReserved: boolean;
  createdAt: Date;
  updatedAt?: Date;

  constructor(request: Partial<SeatCreated> = {}) {
    Object.assign(this, request);
  }
}

export class SeatReserved {
  id: number;
  seatNumber: string;
  seatClass: SeatClass;
  seatType: SeatType;
  flightId: number;
  isReserved: boolean;
  createdAt: Date;
  updatedAt?: Date;

  constructor(request: Partial<SeatReserved> = {}) {
    Object.assign(this, request);
  }
}

export class FlightDto {
  id: number;
  flightNumber: string;
  price: number;
  flightStatus: FlightStatus;
  flightDate: Date;
  departureDate: Date;
  departureAirportId: number;
  aircraftId: number;
  arriveDate: Date;
  arriveAirportId: number;
  durationMinutes: number;
  createdAt: Date;
  updatedAt?: Date;

  constructor(request: Partial<FlightDto> = {}) {
    Object.assign(this, request);
  }
}

export class SeatDto {
  id: number;
  seatNumber: string;
  seatClass: SeatClass;
  seatType: SeatType;
  flightId: number;
  isReserved: boolean;
  createdAt: Date;
  updatedAt?: Date;

  constructor(request: Partial<SeatDto> = {}) {
    Object.assign(this, request);
  }
}

export class ReserveSeatRequestDto {
  seatNumber: string;
  flightId: number;

  constructor(request: Partial<ReserveSeatRequestDto> = {}) {
    Object.assign(this, request);
  }
}

export enum FlightStatus {
  UNKNOWN = 0,
  FLYING = 1,
  DELAY = 2,
  CANCELED = 3,
  COMPLETED = 4
}

export enum SeatClass {
  UNKNOWN = 0,
  FIRST_CLASS,
  BUSINESS,
  ECONOMY
}

export enum SeatType {
  UNKNOWN = 0,
  WINDOW,
  MIDDLE,
  AISLE
}
