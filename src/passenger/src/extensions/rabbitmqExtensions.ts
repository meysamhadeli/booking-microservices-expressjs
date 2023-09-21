import { container } from 'tsyringe';
import {RabbitMQConnection} from "building-blocks/rabbitmq/rabbitmq";
import {Consumer} from "building-blocks/rabbitmq/consumer";
import {UserCreated} from "building-blocks/contracts/identityContract";
import {createUserConsumerHandler} from "../user/consumers/createUser";

export const initialRabbitmq = async (): Promise<RabbitMQConnection> => {
    const rabbitMQConnection = container.resolve(RabbitMQConnection);
    await rabbitMQConnection.createConnection();

    const consumers = container.resolve(Consumer);

    await consumers.consumeMessage(new UserCreated(), createUserConsumerHandler);

    return rabbitMQConnection;
};
