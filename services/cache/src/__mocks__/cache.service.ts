import { productStub } from "../test/stub/product.stub"
import { redis } from "./redis"
export const CacheService = jest.fn().mockReturnValue({
    get: jest.fn().mockImplementation(async (token: string) => productStub("1")),
    set: jest.fn().mockResolvedValue("1"),
    del: jest.fn().mockImplementation(async (token: string) => { }),
    reset: jest.fn()
})


