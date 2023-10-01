import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { FlightStatus } from '../enums/flightStatus';
import { Airport } from '../../airport/entities/airport';
import { Aircraft } from '../../aircraft/entities/aircraft';
import { Seat } from '../../seat/entities/seat';

@Entity()
export class Flight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  flightNumber: string;

  @Column()
  price: number;

  @Column({
    type: 'enum',
    enum: FlightStatus,
    default: FlightStatus.UNKNOWN
  })
  flightStatus: FlightStatus;

  @Column()
  flightDate: Date;

  @Column()
  departureDate: Date;

  @Column()
  departureAirportId: number;

  @Column()
  aircraftId: number;

  @Column()
  arriveDate: Date;

  @Column()
  arriveAirportId: number;

  @Column()
  durationMinutes: number;

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt?: Date | null;

  @ManyToOne(() => Aircraft, (aircraft) => aircraft.flights)
  aircraft?: Aircraft;

  @ManyToOne(() => Airport, (airport) => airport.departureFlights)
  departureAirport?: Airport;

  @ManyToOne(() => Airport, (airport) => airport.arrivalFlights)
  arriveAirport?: Airport;

  @OneToMany(() => Seat, (seat) => seat.flight)
  seats: Seat[];

  constructor(partial?: Partial<Flight>) {
    Object.assign(this, partial);
    this.createdAt = partial?.createdAt ?? new Date();
  }
}
