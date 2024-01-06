import {container} from "tsyringe";
import {
  GetPassengerById,
  GetPassengerByIdHandler
} from "../passenger/features/v1/get-passenger-by-id/get-passenger-by-id";
import {GetPassengers, GetPassengersHandler} from "../passenger/features/v1/get-passengers/get-passengers";
import {mediatrJs} from "building-blocks/mediatr-js/mediatr-js";


export const registerMediatrHandlers = () => {
    mediatrJs.registerRequestHandler(GetPassengerById, container.resolve(GetPassengerByIdHandler));
    mediatrJs.registerRequestHandler(GetPassengers, container.resolve(GetPassengersHandler));
};
