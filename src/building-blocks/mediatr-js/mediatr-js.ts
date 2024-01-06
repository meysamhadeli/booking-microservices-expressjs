export interface IRequestHandler<TRequest, TResponse> {
  handle(request: TRequest): Promise<TResponse>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IRequest<TResponse> {}

class MediatrJs {
  private requestHandlersRegistrations: Record<string, any> = {};

  registerRequestHandler<TRequest, TResponse>(request: new () => TRequest, handler: any) {
    const requestTypeName = this.GetTypeName(request);

    this.requestHandlersRegistrations[requestTypeName] = handler;
  }

  async send<TResponse>(request: IRequest<TResponse>): Promise<TResponse> {
    const requestTypeName = this.GetTypeName(request);

    const handlerFunction: IRequestHandler<IRequest<TResponse>, TResponse> = this
      .requestHandlersRegistrations[requestTypeName];

    if (handlerFunction) {
      return await handlerFunction.handle(request);
    } else {
      throw new Error(`No handler registered for request type: ${requestTypeName}`);
    }
  }

  private GetTypeName(request: any): string {
    return request?.name ?? request.constructor.name;
  }
}

export const mediatrJs = new MediatrJs();
