import 'reflect-metadata';
import { StartedTestContainer } from 'testcontainers';
import { RabbitmqConnectionOptions } from '../../../rabbitmq/rabbitmq-connection-options-builder';
export declare const rabbitMqContainerStart: () => Promise<[
    RabbitmqConnectionOptions,
    StartedTestContainer
]>;
