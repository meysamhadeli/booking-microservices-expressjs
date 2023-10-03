// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var flight_pb = require('./flight_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');

function serialize_flight_GetAvailableSeatsRequest(arg) {
  if (!(arg instanceof flight_pb.GetAvailableSeatsRequest)) {
    throw new Error('Expected argument of type flight.GetAvailableSeatsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_flight_GetAvailableSeatsRequest(buffer_arg) {
  return flight_pb.GetAvailableSeatsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_flight_GetAvailableSeatsResult(arg) {
  if (!(arg instanceof flight_pb.GetAvailableSeatsResult)) {
    throw new Error('Expected argument of type flight.GetAvailableSeatsResult');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_flight_GetAvailableSeatsResult(buffer_arg) {
  return flight_pb.GetAvailableSeatsResult.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_flight_GetByIdRequest(arg) {
  if (!(arg instanceof flight_pb.GetByIdRequest)) {
    throw new Error('Expected argument of type flight.GetByIdRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_flight_GetByIdRequest(buffer_arg) {
  return flight_pb.GetByIdRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_flight_GetFlightByIdResult(arg) {
  if (!(arg instanceof flight_pb.GetFlightByIdResult)) {
    throw new Error('Expected argument of type flight.GetFlightByIdResult');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_flight_GetFlightByIdResult(buffer_arg) {
  return flight_pb.GetFlightByIdResult.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_flight_ReserveSeatRequest(arg) {
  if (!(arg instanceof flight_pb.ReserveSeatRequest)) {
    throw new Error('Expected argument of type flight.ReserveSeatRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_flight_ReserveSeatRequest(buffer_arg) {
  return flight_pb.ReserveSeatRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_flight_ReserveSeatResult(arg) {
  if (!(arg instanceof flight_pb.ReserveSeatResult)) {
    throw new Error('Expected argument of type flight.ReserveSeatResult');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_flight_ReserveSeatResult(buffer_arg) {
  return flight_pb.ReserveSeatResult.deserializeBinary(new Uint8Array(buffer_arg));
}


var FlightGrpcServiceService = exports.FlightGrpcServiceService = {
  getById: {
    path: '/flight.FlightGrpcService/getById',
    requestStream: false,
    responseStream: false,
    requestType: flight_pb.GetByIdRequest,
    responseType: flight_pb.GetFlightByIdResult,
    requestSerialize: serialize_flight_GetByIdRequest,
    requestDeserialize: deserialize_flight_GetByIdRequest,
    responseSerialize: serialize_flight_GetFlightByIdResult,
    responseDeserialize: deserialize_flight_GetFlightByIdResult,
  },
  getAvailableSeats: {
    path: '/flight.FlightGrpcService/getAvailableSeats',
    requestStream: false,
    responseStream: false,
    requestType: flight_pb.GetAvailableSeatsRequest,
    responseType: flight_pb.GetAvailableSeatsResult,
    requestSerialize: serialize_flight_GetAvailableSeatsRequest,
    requestDeserialize: deserialize_flight_GetAvailableSeatsRequest,
    responseSerialize: serialize_flight_GetAvailableSeatsResult,
    responseDeserialize: deserialize_flight_GetAvailableSeatsResult,
  },
  reserveSeat: {
    path: '/flight.FlightGrpcService/reserveSeat',
    requestStream: false,
    responseStream: false,
    requestType: flight_pb.ReserveSeatRequest,
    responseType: flight_pb.ReserveSeatResult,
    requestSerialize: serialize_flight_ReserveSeatRequest,
    requestDeserialize: deserialize_flight_ReserveSeatRequest,
    responseSerialize: serialize_flight_ReserveSeatResult,
    responseDeserialize: deserialize_flight_ReserveSeatResult,
  },
};

exports.FlightGrpcServiceClient = grpc.makeGenericClientConstructor(FlightGrpcServiceService);
