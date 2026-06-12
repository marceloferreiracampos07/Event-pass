export interface IEventBroadcaster {
  publish(channel: string, payload: unknown): Promise<void>;
}