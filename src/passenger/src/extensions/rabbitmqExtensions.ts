import {RabbitMQConnection} from "building-blocks/rabbitmq/rabbitmq";
import {Consumer} from "building-blocks/rabbitmq/consumer";
import {UserCreated} from "building-blocks/contracts/identityContract";
import {createUserConsumerHandler} from "../user/consumers/createUser";

export const initialRabbitmq = async () => {
    const rabbitMQConnection = new RabbitMQConnection();
    await rabbitMQConnection.createConnection();

    const subscriber = new Consumer();
    await subscriber.consumeMessage(new UserCreated(), createUserConsumerHandler);
};
