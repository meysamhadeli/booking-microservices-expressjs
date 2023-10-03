// package: flight
// file: flight.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

export class GetByIdRequest extends jspb.Message { 
    getId(): number;
    setId(value: number): GetByIdRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetByIdRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetByIdRequest): GetByIdRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetByIdRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetByIdRequest;
    static deserializeBinaryFromReader(message: GetByIdRequest, reader: jspb.BinaryReader): GetByIdRequest;
}

export namespace GetByIdRequest {
    export type AsObject = {
        id: number,
    }
}

export class GetFlightByIdResult extends jspb.Message { 

    hasFlightdto(): boolean;
    clearFlightdto(): void;
    getFlightdto(): FlightResponse | undefined;
    setFlightdto(value?: FlightResponse): GetFlightByIdResult;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetFlightByIdResult.AsObject;
    static toObject(includeInstance: boolean, msg: GetFlightByIdResult): GetFlightByIdResult.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetFlightByIdResult, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetFlightByIdResult;
    static deserializeBinaryFromReader(message: GetFlightByIdResult, reader: jspb.BinaryReader): GetFlightByIdResult;
}

export namespace GetFlightByIdResult {
    export type AsObject = {
        flightdto?: FlightResponse.AsObject,
    }
}

export class GetAvailableSeatsResult extends jspb.Message { 
    clearSeatdtosList(): void;
    getSeatdtosList(): Array<SeatDtoResponse>;
    setSeatdtosList(value: Array<SeatDtoResponse>): GetAvailableSeatsResult;
    addSeatdtos(value?: SeatDtoResponse, index?: number): SeatDtoResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetAvailableSeatsResult.AsObject;
    static toObject(includeInstance: boolean, msg: GetAvailableSeatsResult): GetAvailableSeatsResult.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetAvailableSeatsResult, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetAvailableSeatsResult;
    static deserializeBinaryFromReader(message: GetAvailableSeatsResult, reader: jspb.BinaryReader): GetAvailableSeatsResult;
}

export namespace GetAvailableSeatsResult {
    export type AsObject = {
        seatdtosList: Array<SeatDtoResponse.AsObject>,
    }
}

export class ReserveSeatResult extends jspb.Message { 
    getId(): number;
    setId(value: number): ReserveSeatResult;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ReserveSeatResult.AsObject;
    static toObject(includeInstance: boolean, msg: ReserveSeatResult): ReserveSeatResult.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ReserveSeatResult, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ReserveSeatResult;
    static deserializeBinaryFromReader(message: ReserveSeatResult, reader: jspb.BinaryReader): ReserveSeatResult;
}

export namespace ReserveSeatResult {
    export type AsObject = {
        id: number,
    }
}

export class FlightResponse extends jspb.Message { 
    getId(): number;
    setId(value: number): FlightResponse;
    getFlightnumber(): string;
    setFlightnumber(value: string): FlightResponse;
    getAircraftid(): string;
    setAircraftid(value: string): FlightResponse;
    getDepartureairportid(): string;
    setDepartureairportid(value: string): FlightResponse;

    hasDeparturedate(): boolean;
    clearDeparturedate(): void;
    getDeparturedate(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setDeparturedate(value?: google_protobuf_timestamp_pb.Timestamp): FlightResponse;

    hasArrivedate(): boolean;
    clearArrivedate(): void;
    getArrivedate(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setArrivedate(value?: google_protobuf_timestamp_pb.Timestamp): FlightResponse;
    getArriveairportid(): string;
    setArriveairportid(value: string): FlightResponse;
    getDurationminutes(): number;
    setDurationminutes(value: number): FlightResponse;

    hasFlightdate(): boolean;
    clearFlightdate(): void;
    getFlightdate(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setFlightdate(value?: google_protobuf_timestamp_pb.Timestamp): FlightResponse;
    getStatus(): FlightStatus;
    setStatus(value: FlightStatus): FlightResponse;
    getPrice(): number;
    setPrice(value: number): FlightResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FlightResponse.AsObject;
    static toObject(includeInstance: boolean, msg: FlightResponse): FlightResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FlightResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FlightResponse;
    static deserializeBinaryFromReader(message: FlightResponse, reader: jspb.BinaryReader): FlightResponse;
}

export namespace FlightResponse {
    export type AsObject = {
        id: number,
        flightnumber: string,
        aircraftid: string,
        departureairportid: string,
        departuredate?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        arrivedate?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        arriveairportid: string,
        durationminutes: number,
        flightdate?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        status: FlightStatus,
        price: number,
    }
}

export class GetAvailableSeatsRequest extends jspb.Message { 
    getFlightid(): number;
    setFlightid(value: number): GetAvailableSeatsRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetAvailableSeatsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetAvailableSeatsRequest): GetAvailableSeatsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetAvailableSeatsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetAvailableSeatsRequest;
    static deserializeBinaryFromReader(message: GetAvailableSeatsRequest, reader: jspb.BinaryReader): GetAvailableSeatsRequest;
}

export namespace GetAvailableSeatsRequest {
    export type AsObject = {
        flightid: number,
    }
}

export class SeatDtoResponse extends jspb.Message { 
    getId(): number;
    setId(value: number): SeatDtoResponse;
    getSeatnumber(): string;
    setSeatnumber(value: string): SeatDtoResponse;
    getType(): SeatType;
    setType(value: SeatType): SeatDtoResponse;
    getClass(): SeatClass;
    setClass(value: SeatClass): SeatDtoResponse;
    getFlightid(): number;
    setFlightid(value: number): SeatDtoResponse;
    getIsreserved(): boolean;
    setIsreserved(value: boolean): SeatDtoResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SeatDtoResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SeatDtoResponse): SeatDtoResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SeatDtoResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SeatDtoResponse;
    static deserializeBinaryFromReader(message: SeatDtoResponse, reader: jspb.BinaryReader): SeatDtoResponse;
}

export namespace SeatDtoResponse {
    export type AsObject = {
        id: number,
        seatnumber: string,
        type: SeatType,
        pb_class: SeatClass,
        flightid: number,
        isreserved: boolean,
    }
}

export class ReserveSeatRequest extends jspb.Message { 
    getFlightid(): number;
    setFlightid(value: number): ReserveSeatRequest;
    getSeatnumber(): string;
    setSeatnumber(value: string): ReserveSeatRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ReserveSeatRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ReserveSeatRequest): ReserveSeatRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ReserveSeatRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ReserveSeatRequest;
    static deserializeBinaryFromReader(message: ReserveSeatRequest, reader: jspb.BinaryReader): ReserveSeatRequest;
}

export namespace ReserveSeatRequest {
    export type AsObject = {
        flightid: number,
        seatnumber: string,
    }
}

export enum FlightStatus {
    FLIGHT_STATUS_UNKNOWN = 0,
    FLIGHT_STATUS_FLYING = 1,
    FLIGHT_STATUS_DELAY = 2,
    FLIGHT_STATUS_CANCELED = 3,
    FLIGHT_STATUS_COMPLETED = 4,
}

export enum SeatType {
    SEAT_TYPE_UNKNOWN = 0,
    SEAT_TYPE_WINDOW = 1,
    SEAT_TYPE_MIDDLE = 2,
    SEAT_TYPE_AISLE = 3,
}

export enum SeatClass {
    SEAT_CLASS_UNKNOWN = 0,
    SEAT_CLASS_FIRST_CLASS = 1,
    SEAT_CLASS_BUSINESS = 2,
    SEAT_CLASS_ECONOMY = 3,
}
