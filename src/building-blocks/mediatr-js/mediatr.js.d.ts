export type IRequest<TResponse> = IRequestBase;
export interface IRequestBase {
}
export interface IHandler<TRequest extends IRequestBase, TResponse> {
    handle(request: TRequest): Promise<TResponse>;
}
declare class MediatrJs {
    private handlers;
    registerHandler<TRequest, TResponse extends IRequestBase>(request: {
        new (): TRequest;
    }, handler: IHandler<TRequest, TResponse>): void;
    send<TResponse>(request: IRequest<TResponse>): Promise<TResponse>;
    private GetTypeName;
}
export declare const mediatrJs: MediatrJs;
export {};
