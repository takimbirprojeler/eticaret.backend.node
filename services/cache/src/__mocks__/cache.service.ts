import { productStub } from "../test/stub/product.stub"
import { redis } from "./redis"
export const CacheService = jest.fn().mockReturnValue({
    get: jest.fn().mockImplementation(async (token: string) => productStub(token)),
    set: jest.fn().mockResolvedValue((token: string) => ({ key: token })),
    del: jest.fn().mockImplementation(async (token: string) => { }),
    reset: jest.fn()
})


