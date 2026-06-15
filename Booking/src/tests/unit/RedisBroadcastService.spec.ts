import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RedisBroadcastService } from '@/infrastructure/Broadcast/PrismaBookingService';
import { createClient } from 'redis';

vi.mock('redis', () => ({
    createClient: vi.fn().mockReturnValue({
        on: vi.fn(),
        connect: vi.fn(),
        publish: vi.fn(),
        isOpen: false
    })
}));

describe('RedisBroadcastService', () => {
    let service: RedisBroadcastService;
    let mockClient: any;

    beforeEach(() => {
        process.env.REDIS_URL = 'redis://localhost:6379';
        service = new RedisBroadcastService();
        mockClient = (service as any).client;
    });

    it('should throw if REDIS_URL is not set', () => {
        delete process.env.REDIS_URL;
        expect(() => new RedisBroadcastService()).toThrow();
    });

    it('should connect and publish', async () => {
        mockClient.isOpen = false;
        mockClient.connect.mockResolvedValue(undefined);
        mockClient.publish.mockResolvedValue(1);
        await service.publish('channel', 'message');
        expect(mockClient.connect).toHaveBeenCalled();
        expect(mockClient.publish).toHaveBeenCalledWith('channel', 'message');
    });
});
