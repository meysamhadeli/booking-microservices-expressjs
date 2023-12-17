import { RabbitmqOptions } from './rabbitmq-connection';

export class RabbitmqOptionsBuilder {
  private _options: RabbitmqOptions = new RabbitmqOptions();

  get host(): string {
    return this._options.host;
  }

  set host(value: string) {
    this._options.host = value;
  }

  get port(): number {
    return this._options.port;
  }

  set port(value: number) {
    this._options.port = value;
  }

  get username(): string {
    return this._options.username;
  }

  set username(value: string) {
    this._options.username = value;
  }

  get password(): string {
    return this._options.password;
  }

  set password(value: string) {
    this._options.password = value;
  }

  build(): RabbitmqOptions {
    return this._options;
  }
}
