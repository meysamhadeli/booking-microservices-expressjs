import {container} from "tsyringe";
import {mediatrJs} from "building-blocks/mediatr-js/mediatr.js";
import {
  GetPassengerById,
  GetPassengerByIdHandler
} from "../passenger/features/v1/get-passenger-by-id/get-passenger-by-id";
import {GetPassengers, GetPassengersHandler} from "../passenger/features/v1/get-passengers/get-passengers";


export const registerMediatrHandlers = () => {
    mediatrJs.registerHandler(GetPassengerById, container.resolve(GetPassengerByIdHandler));
    mediatrJs.registerHandler(GetPassengers, container.resolve(GetPassengersHandler));
};
