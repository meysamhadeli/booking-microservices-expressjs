import { TypeMapper } from 'ts-mapper';
import { Aircraft } from './entities/aircraft';
import { AircraftDto } from './dtos/aircraftDto';

export class Mapper extends TypeMapper {
  constructor() {
    super();
    this.config();
  }

  private config(): void {
    this.createMap<Aircraft, AircraftDto>()
      .map(
        (src) => src.name,
        (dest) => dest.name
      )
      .map(
        (src) => src.model,
        (dest) => dest.model
      )
      .map(
        (src) => src.manufacturingYear,
        (dest) => dest.manufacturingYear
      )
      .map(
        (src) => src.createdAt,
        (dest) => dest.createdAt
      )
      .map(
        (src) => src.updatedAt,
        (dest) => dest.updatedAt
      )
      .map(
        (src) => src.id,
        (dest) => dest.id
      );
  }
}

const mapper = new Mapper();

export default mapper;
