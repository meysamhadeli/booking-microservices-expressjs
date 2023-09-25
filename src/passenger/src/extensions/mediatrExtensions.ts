import {container} from "tsyringe";
import {mediatrJs} from "building-blocks/mediatr-js/mediatr.js";
import {GetPassengerById, GetPassengerByIdHandler} from "../passenger/features/v1/getPassengerById/getPassengerById";
import {
    GetPassengers,
    GetPassengersHandler
} from "../passenger/features/v1/getPassengers/getPassengers";

export const registerMediatrHandlers = () => {
    mediatrJs.registerHandler(GetPassengerById, container.resolve(GetPassengerByIdHandler));
    mediatrJs.registerHandler(GetPassengers, container.resolve(GetPassengersHandler));
};
