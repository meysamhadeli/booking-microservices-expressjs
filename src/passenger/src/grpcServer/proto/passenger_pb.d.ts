// package: passenger
// file: passenger.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

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

export class GetPassengerByIdResult extends jspb.Message { 

    hasPassengerdto(): boolean;
    clearPassengerdto(): void;
    getPassengerdto(): PassengerResponse | undefined;
    setPassengerdto(value?: PassengerResponse): GetPassengerByIdResult;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetPassengerByIdResult.AsObject;
    static toObject(includeInstance: boolean, msg: GetPassengerByIdResult): GetPassengerByIdResult.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetPassengerByIdResult, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetPassengerByIdResult;
    static deserializeBinaryFromReader(message: GetPassengerByIdResult, reader: jspb.BinaryReader): GetPassengerByIdResult;
}

export namespace GetPassengerByIdResult {
    export type AsObject = {
        passengerdto?: PassengerResponse.AsObject,
    }
}

export class PassengerResponse extends jspb.Message { 
    getId(): number;
    setId(value: number): PassengerResponse;
    getName(): string;
    setName(value: string): PassengerResponse;
    getPassportnumber(): string;
    setPassportnumber(value: string): PassengerResponse;
    getPassengertype(): PassengerType;
    setPassengertype(value: PassengerType): PassengerResponse;
    getAge(): number;
    setAge(value: number): PassengerResponse;
    getEmail(): string;
    setEmail(value: string): PassengerResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PassengerResponse.AsObject;
    static toObject(includeInstance: boolean, msg: PassengerResponse): PassengerResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PassengerResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PassengerResponse;
    static deserializeBinaryFromReader(message: PassengerResponse, reader: jspb.BinaryReader): PassengerResponse;
}

export namespace PassengerResponse {
    export type AsObject = {
        id: number,
        name: string,
        passportnumber: string,
        passengertype: PassengerType,
        age: number,
        email: string,
    }
}

export enum PassengerType {
    PASSENGER_TYPE_UNKNOWN = 0,
    PASSENGER_TYPE_MALE = 1,
    PASSENGER_TYPE_FEMALE = 2,
    PASSENGER_TYPE_BABY = 3,
}
