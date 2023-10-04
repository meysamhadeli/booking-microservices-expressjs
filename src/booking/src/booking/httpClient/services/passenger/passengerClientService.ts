import axios, { AxiosResponse } from 'axios';
import HttpClientException from 'building-blocks/types/exception/httpClientException';
import { httpContext } from '../../../../configurations/authentication';
import { PassengerDto } from 'building-blocks/contracts/passengerContract';

export interface IPassengerClientService {
  getPassengerById(id: number): Promise<PassengerDto>;
}

export class PassengerClientService implements IPassengerClientService {
  private passengerUrl = 'http://localhost:4001';

  async getPassengerById(id: number): Promise<PassengerDto> {
    const result = axios
      .get<PassengerDto>(`${this.passengerUrl}/passenger/v1/get-by-id?id=${id}`, {
        headers: {
          Authorization: httpContext.request.headers.authorization?.toString()
        }
      })
      .then((response: AxiosResponse<PassengerDto>) => {
        const passengerDto: PassengerDto = response.data;
        return passengerDto;
      })
      .catch((error) => {
        throw new HttpClientException(error);
      });
    return result;
  }
}
