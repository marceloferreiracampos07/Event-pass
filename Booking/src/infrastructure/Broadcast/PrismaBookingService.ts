import { IEventBroadcaster } from "../../Domain/Broadcast/IEventBroadcaster";
import { createClient } from "redis";

export class RedisBroadcastService implements IEventBroadcaster {

    private client: ReturnType<typeof createClient>;

    constructor() {

        const redisUrl = process.env.REDIS_URL;
        if (!redisUrl) {
            throw new Error("REDIS_URL não configurada no ambiente");
        }
        this.client = createClient({
            url: redisUrl
        });

        this.client.on("error", (err) => {
            console.error("Redis Client Error", err);
        });
    }

    async publish(channel: string, message: string): Promise<void> {
    
    if (!this.client.isOpen) {
        await this.client.connect();
    }
    
    await this.client.publish(channel, message);
}

}