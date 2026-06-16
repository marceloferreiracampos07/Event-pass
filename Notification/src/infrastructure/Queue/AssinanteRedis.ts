import { Redis } from 'ioredis';
import { configRedis } from '../config/config-redis';
import { DespachanteEventos } from './DespachanteEventos';

export class AssinanteRedis {
    private cliente: Redis;

    constructor(private despachante: DespachanteEventos) {
        if (!configRedis.url) {
            throw new Error('URL do Redis não configurada.');
        }
        this.cliente = new Redis(configRedis.url);
    }

    async iniciar(): Promise<void> {
        await this.cliente.subscribe(configRedis.canalBookings as string);

        this.cliente.on('message', async (canal, mensagem) => {
            if (canal === configRedis.canalBookings) {
                await this.despachante.despachar(mensagem);
            }
        });

        console.log(`Assinado no canal: ${configRedis.canalBookings}`);
    }
}
