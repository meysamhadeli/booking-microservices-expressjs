import axios, { AxiosResponse } from 'axios';
import {
  FlightDto,
  ReserveSeatRequestDto,
  SeatDto
} from 'building-blocks/contracts/flightContract';
import HttpClientException from 'building-blocks/types/exception/httpClientException';
import { httpContext } from '../../../../configurations/authentication';

export interface IFlightClientService {
  getFlightById(id: number): Promise<FlightDto>;
  getAvalibaleSeats(flightId: number): Promise<SeatDto[]>;
  reserveSeat(request: ReserveSeatRequestDto): Promise<void>;
}

export class FlightClientService implements IFlightClientService {
  private flightUrl = 'http://localhost:4002';

  async getFlightById(id: number): Promise<FlightDto> {
    const result = axios
      .get<FlightDto>(`${this.flightUrl}/flight/v1/get-by-id?id=${id}`, {
        headers: {
          Authorization: httpContext.request.headers.authorization?.toString()
        }
      })
      .then((response: AxiosResponse<FlightDto>) => {
        const flightDto: FlightDto = response.data;
        return flightDto;
      })
      .catch((error) => {
        throw new HttpClientException(error);
      });
    return result;
  }

  async getAvalibaleSeats(flightId: number): Promise<SeatDto[]> {
    const result = axios
      .get<SeatDto[]>(`${this.flightUrl}/seat/v1/get-available-seats?flightId=${flightId}`, {
        headers: {
          Authorization: httpContext.request.headers.authorization?.toString()
        }
      })
      .then((response: AxiosResponse<SeatDto[]>) => {
        const seatDtos: SeatDto[] = response.data;
        return seatDtos;
      })
      .catch((error) => {
        throw new HttpClientException(error);
      });
    return result;
  }

  async reserveSeat(request: ReserveSeatRequestDto): Promise<void> {
    const result = axios
      .post(`${this.flightUrl}/seat/v1/reserve`, request, {
        headers: {
          Authorization: httpContext.request.headers.authorization?.toString()
        }
      })
      .then((response: AxiosResponse<SeatDto[]>) => {})
      .catch((error) => {
        throw new HttpClientException(error);
      });
  }
}
