import { ClientsModule, Transport } from '@nestjs/microservices';

export const microservicesConfig = ClientsModule.register({
  clients: [
    {
      name: 'MQTT_SERVICE',
      options: {
        url: process.env.MQTT_URL,
      },
      transport: Transport.MQTT,
    },
  ],
  isGlobal: true,
});
