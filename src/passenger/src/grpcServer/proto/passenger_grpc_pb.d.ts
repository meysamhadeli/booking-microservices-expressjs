// package: passenger
// file: passenger.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as passenger_pb from "./passenger_pb";

interface IPassengerGrpcServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getById: IPassengerGrpcServiceService_IgetById;
}

interface IPassengerGrpcServiceService_IgetById extends grpc.MethodDefinition<passenger_pb.GetByIdRequest, passenger_pb.GetPassengerByIdResult> {
    path: "/passenger.PassengerGrpcService/getById";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<passenger_pb.GetByIdRequest>;
    requestDeserialize: grpc.deserialize<passenger_pb.GetByIdRequest>;
    responseSerialize: grpc.serialize<passenger_pb.GetPassengerByIdResult>;
    responseDeserialize: grpc.deserialize<passenger_pb.GetPassengerByIdResult>;
}

export const PassengerGrpcServiceService: IPassengerGrpcServiceService;

export interface IPassengerGrpcServiceServer {
    getById: grpc.handleUnaryCall<passenger_pb.GetByIdRequest, passenger_pb.GetPassengerByIdResult>;
}

export interface IPassengerGrpcServiceClient {
    getById(request: passenger_pb.GetByIdRequest, callback: (error: grpc.ServiceError | null, response: passenger_pb.GetPassengerByIdResult) => void): grpc.ClientUnaryCall;
    getById(request: passenger_pb.GetByIdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: passenger_pb.GetPassengerByIdResult) => void): grpc.ClientUnaryCall;
    getById(request: passenger_pb.GetByIdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: passenger_pb.GetPassengerByIdResult) => void): grpc.ClientUnaryCall;
}

export class PassengerGrpcServiceClient extends grpc.Client implements IPassengerGrpcServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public getById(request: passenger_pb.GetByIdRequest, callback: (error: grpc.ServiceError | null, response: passenger_pb.GetPassengerByIdResult) => void): grpc.ClientUnaryCall;
    public getById(request: passenger_pb.GetByIdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: passenger_pb.GetPassengerByIdResult) => void): grpc.ClientUnaryCall;
    public getById(request: passenger_pb.GetByIdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: passenger_pb.GetPassengerByIdResult) => void): grpc.ClientUnaryCall;
}
