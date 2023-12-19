import 'reflect-metadata';
import { StartedTestContainer } from 'testcontainers';
import { RabbitmqOptions } from "../../../rabbitmq/rabbitmq-options-builder";
export declare const rabbitMqContainerStart: () => Promise<[
    RabbitmqOptions,
    StartedTestContainer
]>;
