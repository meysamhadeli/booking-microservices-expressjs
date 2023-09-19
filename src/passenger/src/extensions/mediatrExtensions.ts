import {mediatrJs} from "building-blocks/mediatr-js/mediatr.js";
import {GetPassengerById, GetPassengerByIdHandler} from "../passenger/features/v1/getPassengerById";
import {GetAllPassenger, GetAllPassengerHandler} from "../passenger/features/v1/getAllPassengers";

export const registerMediatrHandlers = () => {
    mediatrJs.registerHandler(GetPassengerById, new GetPassengerByIdHandler());
    mediatrJs.registerHandler(GetAllPassenger, new GetAllPassengerHandler());
};
