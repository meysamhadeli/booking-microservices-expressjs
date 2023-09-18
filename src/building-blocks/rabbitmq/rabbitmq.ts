import * as amqp from 'amqplib';

export class RabbitMQConnection {
    async connect(): Promise<amqp.Connection> {
        try{
            return  await amqp.connect('amqp://localhost');
        }catch (error){
            console.log(error);
            throw new Error(error);
        }
    }
}
