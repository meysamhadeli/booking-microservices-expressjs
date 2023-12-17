import 'reflect-metadata';
import { StartedTestContainer } from 'testcontainers';
import { RabbitmqOptions } from "../../../rabbitmq/rabbitmq-connection";
export declare const rabbitMqContainerStart: () => Promise<[
    RabbitmqOptions,
    StartedTestContainer
]>;
