import * as amqp from 'amqplib';
export let connection: amqp.Connection;
export class RabbitMQConnection {
    async createConnection(): Promise<void> {
        try{
            connection =  await amqp.connect('amqp://localhost');
        }catch (error){
            console.log(error);
            throw new Error(error);
        }
    }
}
