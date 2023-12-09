import { container } from 'tsyringe';
import { mediatrJs } from 'building-blocks/mediatr-js/mediatr.js';
import {CreateBooking, CreateBookingHandler} from "../booking/features/v1/create-booking/create-booking";


export const registerMediatrHandlers = () => {
  mediatrJs.registerHandler(CreateBooking, container.resolve(CreateBookingHandler));
};
