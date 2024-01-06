export interface IRequestHandler<TRequest, TResponse> {
    handle(request: TRequest): Promise<TResponse>;
}
export interface IRequest<TResponse> {
}
declare class MediatrJs {
    private requestHandlersRegistrations;
    registerRequestHandler<TRequest, TResponse>(request: TRequest, handler: any): void;
    send<TResponse>(request: IRequest<TResponse>): Promise<TResponse>;
    private GetTypeName;
}
export declare const mediatrJs: MediatrJs;
export {};
