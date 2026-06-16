import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { RedisBroadcastService } from '@/infrastructure/Broadcast/PrismaBookingService';
import { createClient } from 'redis';
import { configuracao } from '@/infrastructure/config/configuracao';

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
    const urlOriginal = configuracao.redisUrl;

    beforeEach(() => {
        configuracao.redisUrl = 'redis://localhost:6379';
        service = new RedisBroadcastService();
        mockClient = (service as any).client;
    });

    afterEach(() => {
        configuracao.redisUrl = urlOriginal;
    });

    it('should throw if REDIS_URL is not set', () => {
        configuracao.redisUrl = undefined;
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

