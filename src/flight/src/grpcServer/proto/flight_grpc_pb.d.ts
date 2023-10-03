// package: flight
// file: flight.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as flight_pb from "./flight_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

interface IFlightGrpcServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getById: IFlightGrpcServiceService_IgetById;
    getAvailableSeats: IFlightGrpcServiceService_IgetAvailableSeats;
    reserveSeat: IFlightGrpcServiceService_IreserveSeat;
}

interface IFlightGrpcServiceService_IgetById extends grpc.MethodDefinition<flight_pb.GetByIdRequest, flight_pb.GetFlightByIdResult> {
    path: "/flight.FlightGrpcService/getById";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<flight_pb.GetByIdRequest>;
    requestDeserialize: grpc.deserialize<flight_pb.GetByIdRequest>;
    responseSerialize: grpc.serialize<flight_pb.GetFlightByIdResult>;
    responseDeserialize: grpc.deserialize<flight_pb.GetFlightByIdResult>;
}
interface IFlightGrpcServiceService_IgetAvailableSeats extends grpc.MethodDefinition<flight_pb.GetAvailableSeatsRequest, flight_pb.GetAvailableSeatsResult> {
    path: "/flight.FlightGrpcService/getAvailableSeats";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<flight_pb.GetAvailableSeatsRequest>;
    requestDeserialize: grpc.deserialize<flight_pb.GetAvailableSeatsRequest>;
    responseSerialize: grpc.serialize<flight_pb.GetAvailableSeatsResult>;
    responseDeserialize: grpc.deserialize<flight_pb.GetAvailableSeatsResult>;
}
interface IFlightGrpcServiceService_IreserveSeat extends grpc.MethodDefinition<flight_pb.ReserveSeatRequest, flight_pb.ReserveSeatResult> {
    path: "/flight.FlightGrpcService/reserveSeat";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<flight_pb.ReserveSeatRequest>;
    requestDeserialize: grpc.deserialize<flight_pb.ReserveSeatRequest>;
    responseSerialize: grpc.serialize<flight_pb.ReserveSeatResult>;
    responseDeserialize: grpc.deserialize<flight_pb.ReserveSeatResult>;
}

export const FlightGrpcServiceService: IFlightGrpcServiceService;

export interface IFlightGrpcServiceServer {
    getById: grpc.handleUnaryCall<flight_pb.GetByIdRequest, flight_pb.GetFlightByIdResult>;
    getAvailableSeats: grpc.handleUnaryCall<flight_pb.GetAvailableSeatsRequest, flight_pb.GetAvailableSeatsResult>;
    reserveSeat: grpc.handleUnaryCall<flight_pb.ReserveSeatRequest, flight_pb.ReserveSeatResult>;
}

export interface IFlightGrpcServiceClient {
    getById(request: flight_pb.GetByIdRequest, callback: (error: grpc.ServiceError | null, response: flight_pb.GetFlightByIdResult) => void): grpc.ClientUnaryCall;
    getById(request: flight_pb.GetByIdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: flight_pb.GetFlightByIdResult) => void): grpc.ClientUnaryCall;
    getById(request: flight_pb.GetByIdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: flight_pb.GetFlightByIdResult) => void): grpc.ClientUnaryCall;
    getAvailableSeats(request: flight_pb.GetAvailableSeatsRequest, callback: (error: grpc.ServiceError | null, response: flight_pb.GetAvailableSeatsResult) => void): grpc.ClientUnaryCall;
    getAvailableSeats(request: flight_pb.GetAvailableSeatsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: flight_pb.GetAvailableSeatsResult) => void): grpc.ClientUnaryCall;
    getAvailableSeats(request: flight_pb.GetAvailableSeatsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: flight_pb.GetAvailableSeatsResult) => void): grpc.ClientUnaryCall;
    reserveSeat(request: flight_pb.ReserveSeatRequest, callback: (error: grpc.ServiceError | null, response: flight_pb.ReserveSeatResult) => void): grpc.ClientUnaryCall;
    reserveSeat(request: flight_pb.ReserveSeatRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: flight_pb.ReserveSeatResult) => void): grpc.ClientUnaryCall;
    reserveSeat(request: flight_pb.ReserveSeatRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: flight_pb.ReserveSeatResult) => void): grpc.ClientUnaryCall;
}

export class FlightGrpcServiceClient extends grpc.Client implements IFlightGrpcServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public getById(request: flight_pb.GetByIdRequest, callback: (error: grpc.ServiceError | null, response: flight_pb.GetFlightByIdResult) => void): grpc.ClientUnaryCall;
    public getById(request: flight_pb.GetByIdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: flight_pb.GetFlightByIdResult) => void): grpc.ClientUnaryCall;
    public getById(request: flight_pb.GetByIdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: flight_pb.GetFlightByIdResult) => void): grpc.ClientUnaryCall;
    public getAvailableSeats(request: flight_pb.GetAvailableSeatsRequest, callback: (error: grpc.ServiceError | null, response: flight_pb.GetAvailableSeatsResult) => void): grpc.ClientUnaryCall;
    public getAvailableSeats(request: flight_pb.GetAvailableSeatsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: flight_pb.GetAvailableSeatsResult) => void): grpc.ClientUnaryCall;
    public getAvailableSeats(request: flight_pb.GetAvailableSeatsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: flight_pb.GetAvailableSeatsResult) => void): grpc.ClientUnaryCall;
    public reserveSeat(request: flight_pb.ReserveSeatRequest, callback: (error: grpc.ServiceError | null, response: flight_pb.ReserveSeatResult) => void): grpc.ClientUnaryCall;
    public reserveSeat(request: flight_pb.ReserveSeatRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: flight_pb.ReserveSeatResult) => void): grpc.ClientUnaryCall;
    public reserveSeat(request: flight_pb.ReserveSeatRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: flight_pb.ReserveSeatResult) => void): grpc.ClientUnaryCall;
}
