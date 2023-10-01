"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutes = void 0;
/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const runtime_1 = require("@tsoa/runtime");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const createAircraft_1 = require("./../aircraft/features/v1/createAircraft/createAircraft");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const createAirport_1 = require("./../airport/features/v1/createAirport/createAirport");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const createFlight_1 = require("./../flight/features/v1/createFlight/createFlight");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const getFlightByNumber_1 = require("./../flight/features/v1/getFlightByNumber/getFlightByNumber");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const createSeat_1 = require("./../seat/features/v1/createSeat/createSeat");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const getAvailableSeats_1 = require("./../seat/features/v1/getAvailableSeats/getAvailableSeats");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const reserveSeat_1 = require("./../seat/features/v1/reserveSeat/reserveSeat");
const authentication_1 = require("./../configurations/authentication");
// @ts-ignore - no great way to install types from subpackage
const promiseAny = require('promise.any');
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
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
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateAircraftRequestDto": {
        "dataType": "refObject",
        "properties": {
            "model": { "dataType": "string", "required": true },
            "name": { "dataType": "string", "required": true },
            "manufacturingYear": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
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
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateAirportRequestDto": {
        "dataType": "refObject",
        "properties": {
            "code": { "dataType": "string", "required": true },
            "name": { "dataType": "string", "required": true },
            "address": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FlightStatus": {
        "dataType": "refEnum",
        "enums": [0, 1, 2, 3, 4],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
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
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
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
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SeatClass": {
        "dataType": "refEnum",
        "enums": [0, 1, 2, 3],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SeatType": {
        "dataType": "refEnum",
        "enums": [0, 1, 2, 3],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
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
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
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
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
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
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
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
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
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
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
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
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReserveSeatRequestDto": {
        "dataType": "refObject",
        "properties": {
            "seatNumber": { "dataType": "string", "required": true },
            "flightId": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new runtime_1.ValidationService(models);
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
function RegisterRoutes(app) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    app.post('/aircraft/v1/create', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(createAircraft_1.CreateAircraftController)), ...((0, runtime_1.fetchMiddlewares)(createAircraft_1.CreateAircraftController.prototype.createAircraft)), function CreateAircraftController_createAircraft(request, response, next) {
        const args = {
            request: { "in": "body", "name": "request", "required": true, "ref": "CreateAircraftRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new createAircraft_1.CreateAircraftController();
            const promise = controller.createAircraft.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, 201, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/airport/v1/create', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(createAirport_1.CreateAirportController)), ...((0, runtime_1.fetchMiddlewares)(createAirport_1.CreateAirportController.prototype.createAirport)), function CreateAirportController_createAirport(request, response, next) {
        const args = {
            request: { "in": "body", "name": "request", "required": true, "ref": "CreateAirportRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new createAirport_1.CreateAirportController();
            const promise = controller.createAirport.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, 201, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/flight/v1/create', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(createFlight_1.CreateFlightController)), ...((0, runtime_1.fetchMiddlewares)(createFlight_1.CreateFlightController.prototype.createFlight)), function CreateFlightController_createFlight(request, response, next) {
        const args = {
            request: { "in": "body", "name": "request", "required": true, "ref": "CreateFlightRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new createFlight_1.CreateFlightController();
            const promise = controller.createFlight.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, 201, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/flight/v1/get-by-number', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(getFlightByNumber_1.GetUserByIdController)), ...((0, runtime_1.fetchMiddlewares)(getFlightByNumber_1.GetUserByIdController.prototype.getFlightByNumber)), function GetUserByIdController_getFlightByNumber(request, response, next) {
        const args = {
            flightNumber: { "in": "query", "name": "flightNumber", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new getFlightByNumber_1.GetUserByIdController();
            const promise = controller.getFlightByNumber.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, 200, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/seat/v1/create', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(createSeat_1.CreateSeatController)), ...((0, runtime_1.fetchMiddlewares)(createSeat_1.CreateSeatController.prototype.createSeat)), function CreateSeatController_createSeat(request, response, next) {
        const args = {
            request: { "in": "body", "name": "request", "required": true, "ref": "CreateSeatRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new createSeat_1.CreateSeatController();
            const promise = controller.createSeat.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, 201, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/seat/v1/get-available-seats', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(getAvailableSeats_1.GetAvailableSeatsController)), ...((0, runtime_1.fetchMiddlewares)(getAvailableSeats_1.GetAvailableSeatsController.prototype.getAvailableSeats)), function GetAvailableSeatsController_getAvailableSeats(request, response, next) {
        const args = {
            flightId: { "in": "query", "name": "flightId", "required": true, "dataType": "double" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new getAvailableSeats_1.GetAvailableSeatsController();
            const promise = controller.getAvailableSeats.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, 200, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/seat/v1/reserve', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(reserveSeat_1.ReserveSeatController)), ...((0, runtime_1.fetchMiddlewares)(reserveSeat_1.ReserveSeatController.prototype.reserveSeat)), function ReserveSeatController_reserveSeat(request, response, next) {
        const args = {
            request: { "in": "body", "name": "request", "required": true, "ref": "ReserveSeatRequestDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new reserveSeat_1.ReserveSeatController();
            const promise = controller.reserveSeat.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, 204, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function authenticateMiddleware(security = []) {
        return function runAuthenticationMiddleware(request, _response, next) {
            return __awaiter(this, void 0, void 0, function* () {
                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
                // keep track of failed auth attempts so we can hand back the most
                // recent one.  This behavior was previously existing so preserving it
                // here
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
                        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
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
                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
                try {
                    request['user'] = yield promiseAny.call(Promise, secMethodOrPromises);
                    next();
                }
                catch (err) {
                    // Show most recent error as response
                    const error = failedAttempts.pop();
                    error.status = error.status || 401;
                    next(error);
                }
                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            });
        };
    }
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
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
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            returnHandler(response, statusCode, data, headers);
        })
            .catch((error) => next(error));
    }
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
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
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function responder(response) {
        return function (status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    }
    ;
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
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
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
exports.RegisterRoutes = RegisterRoutes;
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
//# sourceMappingURL=routes.js.map