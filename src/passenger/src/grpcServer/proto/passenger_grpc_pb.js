// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var passenger_pb = require('./passenger_pb.js');

function serialize_passenger_GetByIdRequest(arg) {
  if (!(arg instanceof passenger_pb.GetByIdRequest)) {
    throw new Error('Expected argument of type passenger.GetByIdRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_passenger_GetByIdRequest(buffer_arg) {
  return passenger_pb.GetByIdRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_passenger_GetPassengerByIdResult(arg) {
  if (!(arg instanceof passenger_pb.GetPassengerByIdResult)) {
    throw new Error('Expected argument of type passenger.GetPassengerByIdResult');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_passenger_GetPassengerByIdResult(buffer_arg) {
  return passenger_pb.GetPassengerByIdResult.deserializeBinary(new Uint8Array(buffer_arg));
}


var PassengerGrpcServiceService = exports.PassengerGrpcServiceService = {
  getById: {
    path: '/passenger.PassengerGrpcService/getById',
    requestStream: false,
    responseStream: false,
    requestType: passenger_pb.GetByIdRequest,
    responseType: passenger_pb.GetPassengerByIdResult,
    requestSerialize: serialize_passenger_GetByIdRequest,
    requestDeserialize: deserialize_passenger_GetByIdRequest,
    responseSerialize: serialize_passenger_GetPassengerByIdResult,
    responseDeserialize: deserialize_passenger_GetPassengerByIdResult,
  },
};

exports.PassengerGrpcServiceClient = grpc.makeGenericClientConstructor(PassengerGrpcServiceService);
