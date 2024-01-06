import { container } from 'tsyringe';
import {
  CreateBooking,
  CreateBookingHandler
} from '../booking/features/v1/create-booking/create-booking';
import { mediatrJs } from 'building-blocks/mediatr-js/mediatr-js';

export const registerMediatrHandlers = () => {
  mediatrJs.registerRequestHandler(new CreateBooking(), container.resolve(CreateBookingHandler));
};
