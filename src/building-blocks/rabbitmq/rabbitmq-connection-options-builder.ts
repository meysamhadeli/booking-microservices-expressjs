export class RabbitmqConnectionOptions {
  host: string;
  port: number;
  username: string;
  password: string;
}

export class RabbitmqConnectionOptionsBuilder {
  private _options: RabbitmqConnectionOptions = new RabbitmqConnectionOptions();

  host(value: string): RabbitmqConnectionOptionsBuilder {
    this._options.host = value;
    return this;
  }

  port(value: number): RabbitmqConnectionOptionsBuilder {
    this._options.port = value;
    return this;
  }

  username(value: string): RabbitmqConnectionOptionsBuilder {
    this._options.username = value;
    return this;
  }

  password(value: string): RabbitmqConnectionOptionsBuilder {
    this._options.password = value;
    return this;
  }

  build(): RabbitmqConnectionOptions {
    return this._options;
  }
}
