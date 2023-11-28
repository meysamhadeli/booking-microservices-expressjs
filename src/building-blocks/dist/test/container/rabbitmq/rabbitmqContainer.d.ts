import 'reflect-metadata';
import { StartedTestContainer } from 'testcontainers';
import { RabbitmqOptions } from '../../../rabbitmq/rabbitmq';
export declare const rabbitMqContainerStart: () => Promise<[
    RabbitmqOptions,
    StartedTestContainer
]>;
