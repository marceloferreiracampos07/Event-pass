import { IEventBroadcaster } from "../../Domain/Broadcast/IEventBroadcaster";
import { createClient } from "redis";
import { configuracao } from "../config/configuracao";
import { logger } from "../utils/logger";

export class RedisBroadcastService implements IEventBroadcaster {
    private client: ReturnType<typeof createClient>;

    constructor() {
        const redisUrl = configuracao.redisUrl;
        
        if (!redisUrl) {
            throw new Error("URL do Redis não configurada");
        }

        this.client = createClient({
            url: redisUrl
        });

        this.client.on("error", (err) => {
            logger.error("Erro no cliente Redis:", err);
        });
    }

    async publish(channel: string, message: string): Promise<void> {
        if (!this.client.isOpen) {
            await this.client.connect();
        }

        await this.client.publish(channel, message);
    }
}
