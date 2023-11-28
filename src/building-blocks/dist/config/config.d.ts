declare const _default: {
    env: any;
    serviceName: any;
    port: any;
    postgres: {
        host: any;
        port: any;
        username: any;
        password: any;
        database: any;
        synchronize: any;
        entities: any;
        migrations: any;
        logging: any;
    };
    jwt: {
        secret: any;
        accessExpirationMinutes: any;
        refreshExpirationDays: any;
    };
    rabbitmq: {
        host: any;
        port: any;
        username: any;
        password: any;
        exchange: any;
    };
    retry: {
        count: any;
        factor: any;
        minTimeout: any;
        maxTimeout: any;
    };
    monitoring: {
        jaegerEndpoint: any;
        zipkinEndpoint: any;
    };
};
export default _default;
