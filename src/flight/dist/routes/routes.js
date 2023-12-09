"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutes = void 0;
const runtime_1 = require("@tsoa/runtime");
const create_aircraft_1 = require("./../aircraft/features/v1/create-aircraft/create-aircraft");
const create_airport_1 = require("./../airport/features/v1/create-airport/create-airport");
const create_flight_1 = require("./../flight/features/v1/create-flight/create-flight");
const get_flight_by_id_1 = require("./../flight/features/v1/get-flight-by-id/get-flight-by-id");
const create_seat_1 = require("./../seat/features/v1/create-seat/create-seat");
const reserve_seat_1 = require("./../seat/features/v1/reserve-seat/reserve-seat");
const get_available_seats_1 = require("./../seat/features/v1/get-available-seats/get-available-seats");
const authentication_1 = require("./../configurations/authentication");
const promiseAny = require('promise.any');
const models = {
    "AircraftDto": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "model": { "dataType": "string", "required": true },
            "name": { "dataType": "string", "required": true },
            "manufacturingYear": { "dataType": "double", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
            "updatedAt": { "dataType": "datetime" },
        },
        "additionalProperties": false,
    },
    "CreateAircraftRequestDto": {
        "dataType": "refObject",
        "properties": {
            "model": { "dataType": "string", "required": true },
            "name": { "dataType": "string", "required": true },
            "manufacturingYear": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    "AirportDto": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "code": { "dataType": "string", "required": true },
            "name": { "dataType": "string", "required": true },
            "address": { "dataType": "string", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
            "updatedAt": { "dataType": "datetime" },
        },
        "additionalProperties": false,
    },
    "CreateAirportRequestDto": {
        "dataType": "refObject",
        "properties": {
            "code": { "dataType": "string", "required": true },
            "name": { "dataType": "string", "required": true },
            "address": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    "FlightStatus": {
        "dataType": "refEnum",
        "enums": [0, 1, 2, 3, 4],
    },
    "FlightDto": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "flightNumber": { "dataType": "string", "required": true },
            "price": { "dataType": "double", "required": true },
            "flightStatus": { "ref": "FlightStatus", "required": true },
            "flightDate": { "dataType": "datetime", "required": true },
            "departureDate": { "dataType": "datetime", "required": true },
            "departureAirportId": { "dataType": "double", "required": true },
            "aircraftId": { "dataType": "double", "required": true },
            "arriveDate": { "dataType": "datetime", "required": true },
            "arriveAirportId": { "dataType": "double", "required": true },
            "durationMinutes": { "dataType": "double", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
            "updatedAt": { "dataType": "datetime" },
        },
        "additionalProperties": false,
    },
    "CreateFlightRequestDto": {
        "dataType": "refObject",
        "properties": {
            "flightNumber": { "dataType": "string", "required": true },
            "price": { "dataType": "double", "required": true },
            "flightStatus": { "ref": "FlightStatus", "required": true },
            "flightDate": { "dataType": "datetime", "required": true },
            "departureDate": { "dataType": "datetime", "required": true },
            "departureAirportId": { "dataType": "double", "required": true },
            "aircraftId": { "dataType": "double", "required": true },
            "arriveDate": { "dataType": "datetime", "required": true },
            "arriveAirportId": { "dataType": "double", "required": true },
            "durationMinutes": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    "SeatClass": {
        "dataType": "refEnum",
        "enums": [0, 1, 2, 3],
    },
    "SeatType": {
        "dataType": "refEnum",
        "enums": [0, 1, 2, 3],
    },
    "SeatDto": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "seatNumber": { "dataType": "string", "required": true },
            "seatClass": { "ref": "SeatClass", "required": true },
            "seatType": { "ref": "SeatType", "required": true },
            "flightId": { "dataType": "double", "required": true },
            "isReserved": { "dataType": "boolean", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
            "updatedAt": { "dataType": "datetime" },
        },
        "additionalProperties": false,
    },
    "CreateSeatRequestDto": {
        "dataType": "refObject",
        "properties": {
            "seatNumber": { "dataType": "string", "required": true },
            "seatClass": { "ref": "SeatClass", "required": true },
            "seatType": { "ref": "SeatType", "required": true },
            "flightId": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    "Flight": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "flightNumber": { "dataType": "string", "required": true },
            "price": { "dataType": "double", "required": true },
            "flightStatus": { "ref": "FlightStatus", "required": true },
            "flightDate": { "dataType": "datetime", "required": true },
            "departureDate": { "dataType": "datetime", "required": true },
            "departureAirportId": { "dataType": "double", "required": true },
            "aircraftId": { "dataType": "double", "required": true },
            "arriveDate": { "dataType": "datetime", "required": true },
            "arriveAirportId": { "dataType": "double", "required": true },
            "durationMinutes": { "dataType": "double", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
            "updatedAt": { "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "enum", "enums": [null] }] },
            "aircraft": { "ref": "Aircraft" },
            "departureAirport": { "ref": "Airport" },
            "arriveAirport": { "ref": "Airport" },
            "seats": { "dataType": "array", "array": { "dataType": "refObject", "ref": "Seat" }, "required": true },
        },
        "additionalProperties": false,
    },
    "Aircraft": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "name": { "dataType": "string", "required": true },
            "model": { "dataType": "string", "required": true },
            "manufacturingYear": { "dataType": "double", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
            "updatedAt": { "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "enum", "enums": [null] }] },
            "flights": { "dataType": "array", "array": { "dataType": "refObject", "ref": "Flight" }, "required": true },
        },
        "additionalProperties": false,
    },
    "Airport": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "name": { "dataType": "string", "required": true },
            "address": { "dataType": "string", "required": true },
            "code": { "dataType": "string", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
            "updatedAt": { "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "enum", "enums": [null] }] },
            "departureFlights": { "dataType": "array", "array": { "dataType": "refObject", "ref": "Flight" }, "required": true },
            "arrivalFlights": { "dataType": "array", "array": { "dataType": "refObject", "ref": "Flight" }, "required": true },
        },
        "additionalProperties": false,
    },
    "Seat": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "seatNumber": { "dataType": "string", "required": true },
            "seatClass": { "ref": "SeatClass", "required": true },
            "seatType": { "ref": "SeatType", "required": true },
            "flightId": { "dataType": "double", "required": true },
            "isReserved": { "dataType": "boolean", "required": true },
            "flight": { "ref": "Flight" },
            "createdAt": { "dataType": "datetime", "required": true },
            "updatedAt": { "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    "ReserveSeatRequestDto": {
        "dataType": "refObject",
        "properties": {
            "seatNumber": { "dataType": "string", "required": true },
            "flightId": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
};
const validationService = new runtime_1.ValidationService(models);
function RegisterRoutes(app) {
    app.post('/aircraft/v1/create', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(create_aircraft_1.CreateAircraftController)), ...((0, runtime_1.fetchMiddlewares)(create_aircraft_1.CreateAircraftController.prototype.createAircraft)), function CreateAircraftController_createAircraft(request, response, next) {
        const args = {
            request: { "in": "body", "name": "request", "required": true, "ref": "CreateAircraftRequestDto" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new create_aircraft_1.CreateAircraftController();
            const promise = controller.createAircraft.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, 201, next);
        }
        catch (err) {
            return next(err);
        }
    });
    app.post('/airport/v1/create', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(create_airport_1.CreateAirportController)), ...((0, runtime_1.fetchMiddlewares)(create_airport_1.CreateAirportController.prototype.createAirport)), function CreateAirportController_createAirport(request, response, next) {
        const args = {
            request: { "in": "body", "name": "request", "required": true, "ref": "CreateAirportRequestDto" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new create_airport_1.CreateAirportController();
            const promise = controller.createAirport.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, 201, next);
        }
        catch (err) {
            return next(err);
        }
    });
    app.post('/flight/v1/create', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(create_flight_1.CreateFlightController)), ...((0, runtime_1.fetchMiddlewares)(create_flight_1.CreateFlightController.prototype.createFlight)), function CreateFlightController_createFlight(request, response, next) {
        const args = {
            request: { "in": "body", "name": "request", "required": true, "ref": "CreateFlightRequestDto" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new create_flight_1.CreateFlightController();
            const promise = controller.createFlight.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, 201, next);
        }
        catch (err) {
            return next(err);
        }
    });
    app.get('/flight/v1/get-by-id', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(get_flight_by_id_1.GetUserByIdController)), ...((0, runtime_1.fetchMiddlewares)(get_flight_by_id_1.GetUserByIdController.prototype.getFlightById)), function GetUserByIdController_getFlightById(request, response, next) {
        const args = {
            id: { "in": "query", "name": "id", "required": true, "dataType": "double" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new get_flight_by_id_1.GetUserByIdController();
            const promise = controller.getFlightById.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, 200, next);
        }
        catch (err) {
            return next(err);
        }
    });
    app.post('/seat/v1/create', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(create_seat_1.CreateSeatController)), ...((0, runtime_1.fetchMiddlewares)(create_seat_1.CreateSeatController.prototype.createSeat)), function CreateSeatController_createSeat(request, response, next) {
        const args = {
            request: { "in": "body", "name": "request", "required": true, "ref": "CreateSeatRequestDto" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new create_seat_1.CreateSeatController();
            const promise = controller.createSeat.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, 201, next);
        }
        catch (err) {
            return next(err);
        }
    });
    app.post('/seat/v1/reserve', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(reserve_seat_1.ReserveSeatController)), ...((0, runtime_1.fetchMiddlewares)(reserve_seat_1.ReserveSeatController.prototype.reserveSeat)), function ReserveSeatController_reserveSeat(request, response, next) {
        const args = {
            request: { "in": "body", "name": "request", "required": true, "ref": "ReserveSeatRequestDto" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new reserve_seat_1.ReserveSeatController();
            const promise = controller.reserveSeat.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, 204, next);
        }
        catch (err) {
            return next(err);
        }
    });
    app.get('/seat/v1/get-available-seats', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(get_available_seats_1.GetAvailableSeatsController)), ...((0, runtime_1.fetchMiddlewares)(get_available_seats_1.GetAvailableSeatsController.prototype.getAvailableSeats)), function GetAvailableSeatsController_getAvailableSeats(request, response, next) {
        const args = {
            flightId: { "in": "query", "name": "flightId", "required": true, "dataType": "double" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new get_available_seats_1.GetAvailableSeatsController();
            const promise = controller.getAvailableSeats.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, 200, next);
        }
        catch (err) {
            return next(err);
        }
    });
    function authenticateMiddleware(security = []) {
        return async function runAuthenticationMiddleware(request, _response, next) {
            const failedAttempts = [];
            const pushAndRethrow = (error) => {
                failedAttempts.push(error);
                throw error;
            };
            const secMethodOrPromises = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises = [];
                    for (const name in secMethod) {
                        secMethodAndPromises.push((0, authentication_1.expressAuthentication)(request, name, secMethod[name])
                            .catch(pushAndRethrow));
                    }
                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                }
                else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push((0, authentication_1.expressAuthentication)(request, name, secMethod[name])
                            .catch(pushAndRethrow));
                    }
                }
            }
            try {
                request['user'] = await promiseAny.call(Promise, secMethodOrPromises);
                next();
            }
            catch (err) {
                const error = failedAttempts.pop();
                error.status = error.status || 401;
                next(error);
            }
        };
    }
    function isController(object) {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }
    function promiseHandler(controllerObj, promise, response, successStatus, next) {
        return Promise.resolve(promise)
            .then((data) => {
            let statusCode = successStatus;
            let headers;
            if (isController(controllerObj)) {
                headers = controllerObj.getHeaders();
                statusCode = controllerObj.getStatus() || statusCode;
            }
            returnHandler(response, statusCode, data, headers);
        })
            .catch((error) => next(error));
    }
    function returnHandler(response, statusCode, data, headers = {}) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            response.status(statusCode || 200);
            data.pipe(response);
        }
        else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        }
        else {
            response.status(statusCode || 204).end();
        }
    }
    function responder(response) {
        return function (status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    }
    ;
    function getValidatedArgs(args, request, response) {
        const fieldErrors = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'queries':
                    return validationService.ValidateParam(args[key], request.query, name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                    }
                    else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                    }
                    else {
                        return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                    }
                case 'res':
                    return responder(response);
            }
        });
        if (Object.keys(fieldErrors).length > 0) {
            throw new runtime_1.ValidateError(fieldErrors, '');
        }
        return values;
    }
}
exports.RegisterRoutes = RegisterRoutes;
//# sourceMappingURL=routes.js.map