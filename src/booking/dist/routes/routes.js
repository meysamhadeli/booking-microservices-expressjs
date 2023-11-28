"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutes = void 0;
const runtime_1 = require("@tsoa/runtime");
const createBooking_1 = require("./../booking/features/v1/createBooking/createBooking");
const authentication_1 = require("./../configurations/authentication");
const promiseAny = require('promise.any');
const models = {
    "BookingDto": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "flightNumber": { "dataType": "string", "required": true },
            "aircraftId": { "dataType": "double", "required": true },
            "departureAirportId": { "dataType": "double", "required": true },
            "arriveAirportId": { "dataType": "double", "required": true },
            "flightDate": { "dataType": "datetime", "required": true },
            "price": { "dataType": "double", "required": true },
            "description": { "dataType": "string", "required": true },
            "seatNumber": { "dataType": "string", "required": true },
            "passengerName": { "dataType": "string", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
            "updatedAt": { "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    "CreateBookingRequestDto": {
        "dataType": "refObject",
        "properties": {
            "passengerId": { "dataType": "double", "required": true },
            "flightId": { "dataType": "double", "required": true },
            "description": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
};
const validationService = new runtime_1.ValidationService(models);
function RegisterRoutes(app) {
    app.post('/booking/v1/create', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(createBooking_1.CreateBookingController)), ...((0, runtime_1.fetchMiddlewares)(createBooking_1.CreateBookingController.prototype.createBooking)), function CreateBookingController_createBooking(request, response, next) {
        const args = {
            request: { "in": "body", "name": "request", "required": true, "ref": "CreateBookingRequestDto" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new createBooking_1.CreateBookingController();
            const promise = controller.createBooking.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, 201, next);
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