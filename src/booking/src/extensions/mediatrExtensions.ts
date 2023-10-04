import { container } from 'tsyringe';
import { mediatrJs } from 'building-blocks/mediatr-js/mediatr.js';
import { CreateBooking, CreateBookingHandler } from '../booking/features/v1/createBooking/createBooking';


export const registerMediatrHandlers = () => {
  mediatrJs.registerHandler(CreateBooking, container.resolve(CreateBookingHandler));
};
