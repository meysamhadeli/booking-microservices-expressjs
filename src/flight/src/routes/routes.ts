/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import { fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CreateAircraftController } from './../aircraft/features/v1/create-aircraft/create-aircraft';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CreateAirportController } from './../airport/features/v1/create-airport/create-airport';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CreateFlightController } from './../flight/features/v1/create-flight/create-flight';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { GetUserByIdController } from './../flight/features/v1/get-flight-by-id/get-flight-by-id';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CreateSeatController } from './../seat/features/v1/create-seat/create-seat';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ReserveSeatController } from './../seat/features/v1/reserve-seat/reserve-seat';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { GetAvailableSeatsController } from './../seat/features/v1/get-available-seats/get-available-seats';
import { expressAuthentication } from './../../../building-blocks/jwt/jwt';
// @ts-ignore - no great way to install types from subpackage
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';

const expressAuthenticationRecasted = expressAuthentication as (
  req: ExRequest,
  securityName: string,
  scopes?: string[],
  res?: ExResponse
) => Promise<any>;

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
  AircraftDto: {
    dataType: 'refObject',
    properties: {
      id: { dataType: 'double', required: true },
      model: { dataType: 'string', required: true },
      name: { dataType: 'string', required: true },
      manufacturingYear: { dataType: 'double', required: true },
      createdAt: { dataType: 'datetime', required: true },
      updatedAt: { dataType: 'datetime' }
    },
    additionalProperties: false
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CreateAircraftRequestDto: {
    dataType: 'refObject',
    properties: {
      model: { dataType: 'string', required: true },
      name: { dataType: 'string', required: true },
      manufacturingYear: { dataType: 'double', required: true }
    },
    additionalProperties: false
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  AirportDto: {
    dataType: 'refObject',
    properties: {
      id: { dataType: 'double', required: true },
      code: { dataType: 'string', required: true },
      name: { dataType: 'string', required: true },
      address: { dataType: 'string', required: true },
      createdAt: { dataType: 'datetime', required: true },
      updatedAt: { dataType: 'datetime' }
    },
    additionalProperties: false
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CreateAirportRequestDto: {
    dataType: 'refObject',
    properties: {
      code: { dataType: 'string', required: true },
      name: { dataType: 'string', required: true },
      address: { dataType: 'string', required: true }
    },
    additionalProperties: false
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  FlightStatus: {
    dataType: 'refEnum',
    enums: [0, 1, 2, 3, 4]
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  FlightDto: {
    dataType: 'refObject',
    properties: {
      id: { dataType: 'double', required: true },
      flightNumber: { dataType: 'string', required: true },
      price: { dataType: 'double', required: true },
      flightStatus: { ref: 'FlightStatus', required: true },
      flightDate: { dataType: 'datetime', required: true },
      departureDate: { dataType: 'datetime', required: true },
      departureAirportId: { dataType: 'double', required: true },
      aircraftId: { dataType: 'double', required: true },
      arriveDate: { dataType: 'datetime', required: true },
      arriveAirportId: { dataType: 'double', required: true },
      durationMinutes: { dataType: 'double', required: true },
      createdAt: { dataType: 'datetime', required: true },
      updatedAt: { dataType: 'datetime' }
    },
    additionalProperties: false
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CreateFlightRequestDto: {
    dataType: 'refObject',
    properties: {
      flightNumber: { dataType: 'string', required: true },
      price: { dataType: 'double', required: true },
      flightStatus: { ref: 'FlightStatus', required: true },
      flightDate: { dataType: 'datetime', required: true },
      departureDate: { dataType: 'datetime', required: true },
      departureAirportId: { dataType: 'double', required: true },
      aircraftId: { dataType: 'double', required: true },
      arriveDate: { dataType: 'datetime', required: true },
      arriveAirportId: { dataType: 'double', required: true },
      durationMinutes: { dataType: 'double', required: true }
    },
    additionalProperties: false
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  SeatClass: {
    dataType: 'refEnum',
    enums: [0, 1, 2, 3]
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  SeatType: {
    dataType: 'refEnum',
    enums: [0, 1, 2, 3]
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  SeatDto: {
    dataType: 'refObject',
    properties: {
      id: { dataType: 'double', required: true },
      seatNumber: { dataType: 'string', required: true },
      seatClass: { ref: 'SeatClass', required: true },
      seatType: { ref: 'SeatType', required: true },
      flightId: { dataType: 'double', required: true },
      isReserved: { dataType: 'boolean', required: true },
      createdAt: { dataType: 'datetime', required: true },
      updatedAt: { dataType: 'datetime' }
    },
    additionalProperties: false
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CreateSeatRequestDto: {
    dataType: 'refObject',
    properties: {
      seatNumber: { dataType: 'string', required: true },
      seatClass: { ref: 'SeatClass', required: true },
      seatType: { ref: 'SeatType', required: true },
      flightId: { dataType: 'double', required: true }
    },
    additionalProperties: false
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Flight: {
    dataType: 'refObject',
    properties: {
      id: { dataType: 'double', required: true },
      flightNumber: { dataType: 'string', required: true },
      price: { dataType: 'double', required: true },
      flightStatus: { ref: 'FlightStatus', required: true },
      flightDate: { dataType: 'datetime', required: true },
      departureDate: { dataType: 'datetime', required: true },
      departureAirportId: { dataType: 'double', required: true },
      aircraftId: { dataType: 'double', required: true },
      arriveDate: { dataType: 'datetime', required: true },
      arriveAirportId: { dataType: 'double', required: true },
      durationMinutes: { dataType: 'double', required: true },
      createdAt: { dataType: 'datetime', required: true },
      updatedAt: {
        dataType: 'union',
        subSchemas: [{ dataType: 'datetime' }, { dataType: 'enum', enums: [null] }]
      },
      aircraft: { ref: 'Aircraft' },
      departureAirport: { ref: 'Airport' },
      arriveAirport: { ref: 'Airport' },
      seats: { dataType: 'array', array: { dataType: 'refObject', ref: 'Seat' }, required: true }
    },
    additionalProperties: false
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Aircraft: {
    dataType: 'refObject',
    properties: {
      id: { dataType: 'double', required: true },
      name: { dataType: 'string', required: true },
      model: { dataType: 'string', required: true },
      manufacturingYear: { dataType: 'double', required: true },
      createdAt: { dataType: 'datetime', required: true },
      updatedAt: {
        dataType: 'union',
        subSchemas: [{ dataType: 'datetime' }, { dataType: 'enum', enums: [null] }]
      },
      flights: {
        dataType: 'array',
        array: { dataType: 'refObject', ref: 'Flight' },
        required: true
      }
    },
    additionalProperties: false
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Airport: {
    dataType: 'refObject',
    properties: {
      id: { dataType: 'double', required: true },
      name: { dataType: 'string', required: true },
      address: { dataType: 'string', required: true },
      code: { dataType: 'string', required: true },
      createdAt: { dataType: 'datetime', required: true },
      updatedAt: {
        dataType: 'union',
        subSchemas: [{ dataType: 'datetime' }, { dataType: 'enum', enums: [null] }]
      },
      departureFlights: {
        dataType: 'array',
        array: { dataType: 'refObject', ref: 'Flight' },
        required: true
      },
      arrivalFlights: {
        dataType: 'array',
        array: { dataType: 'refObject', ref: 'Flight' },
        required: true
      }
    },
    additionalProperties: false
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Seat: {
    dataType: 'refObject',
    properties: {
      id: { dataType: 'double', required: true },
      seatNumber: { dataType: 'string', required: true },
      seatClass: { ref: 'SeatClass', required: true },
      seatType: { ref: 'SeatType', required: true },
      flightId: { dataType: 'double', required: true },
      isReserved: { dataType: 'boolean', required: true },
      flight: { ref: 'Flight' },
      createdAt: { dataType: 'datetime', required: true },
      updatedAt: {
        dataType: 'union',
        subSchemas: [{ dataType: 'datetime' }, { dataType: 'enum', enums: [null] }]
      }
    },
    additionalProperties: false
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  ReserveSeatRequestDto: {
    dataType: 'refObject',
    properties: {
      seatNumber: { dataType: 'string', required: true },
      flightId: { dataType: 'double', required: true }
    },
    additionalProperties: false
  }
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {
  noImplicitAdditionalProperties: 'throw-on-extras',
  bodyCoercion: true
});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
  // ###########################################################################################################
  //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
  //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
  // ###########################################################################################################

  const argsCreateAircraftController_createAircraft: Record<string, TsoaRoute.ParameterSchema> = {
    request: { in: 'body', name: 'request', required: true, ref: 'CreateAircraftRequestDto' }
  };
  app.post(
    '/api/v1/aircraft/create',
    authenticateMiddleware([{ jwt: [] }]),
    ...fetchMiddlewares<RequestHandler>(CreateAircraftController),
    ...fetchMiddlewares<RequestHandler>(CreateAircraftController.prototype.createAircraft),

    async function CreateAircraftController_createAircraft(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsCreateAircraftController_createAircraft,
          request,
          response
        });

        const controller = new CreateAircraftController();

        await templateService.apiHandler({
          methodName: 'createAircraft',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 201
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsCreateAirportController_createAirport: Record<string, TsoaRoute.ParameterSchema> = {
    request: { in: 'body', name: 'request', required: true, ref: 'CreateAirportRequestDto' }
  };
  app.post(
    '/api/v1/airport/create',
    authenticateMiddleware([{ jwt: [] }]),
    ...fetchMiddlewares<RequestHandler>(CreateAirportController),
    ...fetchMiddlewares<RequestHandler>(CreateAirportController.prototype.createAirport),

    async function CreateAirportController_createAirport(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsCreateAirportController_createAirport,
          request,
          response
        });

        const controller = new CreateAirportController();

        await templateService.apiHandler({
          methodName: 'createAirport',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 201
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsCreateFlightController_createFlight: Record<string, TsoaRoute.ParameterSchema> = {
    request: { in: 'body', name: 'request', required: true, ref: 'CreateFlightRequestDto' }
  };
  app.post(
    '/api/v1/flight/create',
    authenticateMiddleware([{ jwt: [] }]),
    ...fetchMiddlewares<RequestHandler>(CreateFlightController),
    ...fetchMiddlewares<RequestHandler>(CreateFlightController.prototype.createFlight),

    async function CreateFlightController_createFlight(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsCreateFlightController_createFlight,
          request,
          response
        });

        const controller = new CreateFlightController();

        await templateService.apiHandler({
          methodName: 'createFlight',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 201
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsGetUserByIdController_getFlightById: Record<string, TsoaRoute.ParameterSchema> = {
    id: { in: 'query', name: 'id', required: true, dataType: 'double' }
  };
  app.get(
    '/api/v1/flight/get-by-id',
    authenticateMiddleware([{ jwt: [] }]),
    ...fetchMiddlewares<RequestHandler>(GetUserByIdController),
    ...fetchMiddlewares<RequestHandler>(GetUserByIdController.prototype.getFlightById),

    async function GetUserByIdController_getFlightById(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsGetUserByIdController_getFlightById,
          request,
          response
        });

        const controller = new GetUserByIdController();

        await templateService.apiHandler({
          methodName: 'getFlightById',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 200
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsCreateSeatController_createSeat: Record<string, TsoaRoute.ParameterSchema> = {
    request: { in: 'body', name: 'request', required: true, ref: 'CreateSeatRequestDto' }
  };
  app.post(
    '/api/v1/seat/create',
    authenticateMiddleware([{ jwt: [] }]),
    ...fetchMiddlewares<RequestHandler>(CreateSeatController),
    ...fetchMiddlewares<RequestHandler>(CreateSeatController.prototype.createSeat),

    async function CreateSeatController_createSeat(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsCreateSeatController_createSeat,
          request,
          response
        });

        const controller = new CreateSeatController();

        await templateService.apiHandler({
          methodName: 'createSeat',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 201
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsReserveSeatController_reserveSeat: Record<string, TsoaRoute.ParameterSchema> = {
    request: { in: 'body', name: 'request', required: true, ref: 'ReserveSeatRequestDto' }
  };
  app.post(
    '/api/v1/seat/reserve',
    authenticateMiddleware([{ jwt: [] }]),
    ...fetchMiddlewares<RequestHandler>(ReserveSeatController),
    ...fetchMiddlewares<RequestHandler>(ReserveSeatController.prototype.reserveSeat),

    async function ReserveSeatController_reserveSeat(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsReserveSeatController_reserveSeat,
          request,
          response
        });

        const controller = new ReserveSeatController();

        await templateService.apiHandler({
          methodName: 'reserveSeat',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 204
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsGetAvailableSeatsController_getAvailableSeats: Record<
    string,
    TsoaRoute.ParameterSchema
  > = {
    flightId: { in: 'query', name: 'flightId', required: true, dataType: 'double' }
  };
  app.get(
    '/api/v1/seat/get-available-seats',
    authenticateMiddleware([{ jwt: [] }]),
    ...fetchMiddlewares<RequestHandler>(GetAvailableSeatsController),
    ...fetchMiddlewares<RequestHandler>(GetAvailableSeatsController.prototype.getAvailableSeats),

    async function GetAvailableSeatsController_getAvailableSeats(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsGetAvailableSeatsController_getAvailableSeats,
          request,
          response
        });

        const controller = new GetAvailableSeatsController();

        await templateService.apiHandler({
          methodName: 'getAvailableSeats',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 200
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
    return async function runAuthenticationMiddleware(request: any, response: any, next: any) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      // keep track of failed auth attempts so we can hand back the most
      // recent one.  This behavior was previously existing so preserving it
      // here
      const failedAttempts: any[] = [];
      const pushAndRethrow = (error: any) => {
        failedAttempts.push(error);
        throw error;
      };

      const secMethodOrPromises: Promise<any>[] = [];
      for (const secMethod of security) {
        if (Object.keys(secMethod).length > 1) {
          const secMethodAndPromises: Promise<any>[] = [];

          for (const name in secMethod) {
            secMethodAndPromises.push(
              expressAuthenticationRecasted(request, name, secMethod[name], response).catch(
                pushAndRethrow
              )
            );
          }

          // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

          secMethodOrPromises.push(
            Promise.all(secMethodAndPromises).then((users) => {
              return users[0];
            })
          );
        } else {
          for (const name in secMethod) {
            secMethodOrPromises.push(
              expressAuthenticationRecasted(request, name, secMethod[name], response).catch(
                pushAndRethrow
              )
            );
          }
        }
      }

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      try {
        request['user'] = await Promise.any(secMethodOrPromises);

        // Response was sent in middleware, abort
        if (response.writableEnded) {
          return;
        }

        next();
      } catch (err) {
        // Show most recent error as response
        const error = failedAttempts.pop();
        error.status = error.status || 401;

        // Response was sent in middleware, abort
        if (response.writableEnded) {
          return;
        }
        next(error);
      }

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    };
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
