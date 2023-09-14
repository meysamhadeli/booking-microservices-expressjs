/**
 * Defines a Request with a reponse
 */
// @ts-ignore
export interface IRequest<TResponse> extends IRequestBase{}

/**
 * Defnies a basic Request
 */
export interface IRequestBase {}


/**
 * Defines a Handler with a requets and a response
 */
export interface IHandler<TRequest extends IRequestBase, TResponse> {
  handle(request: TRequest): Promise<TResponse>;
}
/**


/**
 * Manage registration and resolving handlers
 */
class MediatrJs {
  private handlers: Record<string, IHandler<any, any>> = {};

  /**
   * Register a handler in a dictionnary
   *
   * @param request - Request associated with handler in registration
   * @param handler - Handler in registration
   */
  registerHandler<TRequest, TResponse extends IRequestBase>(request: { new(): TRequest }, handler: IHandler<TRequest, TResponse>): void {
    const requestName: string = this.GetTypeName(new request());

    if(this.handlers[requestName] !== undefined) {
      throw new Error("Request is already attribute to a handler");
    }

    this.handlers[requestName] = handler;
  }

  /**
   * Return the handler corresponding to the request
   *
   * @param request - Request associated with desired handler
   * @returns The result from the handler
   */
  async send<TResponse>(request: IRequest<TResponse>): Promise<TResponse> {
    if(request === undefined || request === null) {
      throw new Error("Null or undefined request");
    }

    const requestName: string = this.GetTypeName(request);
    const handlerFunction = this.handlers[requestName];

    if(!!!handlerFunction) {
      throw new Error("Request is not registered");
    }

    const handler = <IHandler<IRequestBase, TResponse>>this.handlers[requestName];
    return await handler.handle(request);
  }

  private GetTypeName(request: IRequestBase): string {
    return request.constructor.name;
  }
}

export const mediatrJs = new MediatrJs();
