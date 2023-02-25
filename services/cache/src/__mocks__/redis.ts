import { productStub } from "../test/stub/product.stub";

export const redis = {
    get: jest.fn().mockResolvedValue(async (token: string) => JSON.stringify({ value: productStub(token) })),
    set: jest.fn().mockResolvedValue("1"),
    del: jest.fn().mockImplementation(async (token: string) => { }),
    flushall: jest.fn(),
}