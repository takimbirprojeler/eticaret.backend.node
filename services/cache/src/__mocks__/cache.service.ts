import { productStub } from '../test/stub/product.stub';

import { Product } from '@libs/entities/src';
export const CacheService = jest.fn().mockReturnValue({
    get: jest.fn().mockImplementation(async (token: '1' | '2' | '3') => {
        if (token == '1')
            return {
                product: new Product(productStub(token)),
            };
        if (token == '2')
            return {
                products: [
                    new Product(productStub('1')),
                    new Product(productStub('1')),
                ],
            };
        if (token == '3')
            return {
                error: {
                    message: 'Cache not found',
                    code: 'C1G',
                },
            };
    }),
    set: jest
        .fn()
        // eslint-disable-next-line
        .mockImplementation(async ({ id: string, cache: ICache, ttl: number }) => { return }),
    // eslint-disable-next-line
    del: jest.fn().mockImplementation(async (token): Promise<void> => {
        return;
    }),
    reset: jest.fn(),
});
