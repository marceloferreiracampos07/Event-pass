export interface IEventBroadcaster {
    publish(channel: string, message: string): Promise<void>;
}
