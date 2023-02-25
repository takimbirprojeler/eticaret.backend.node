import { productStub } from "../test/stub/product.stub";

export const redis = {
    get: jest.fn().mockResolvedValue(async (token: string) => productStub("1")),
    set: jest.fn().mockResolvedValue("1"),
    del: jest.fn().mockImplementation(async (token: string) => { }),
    flushall: jest.fn(),
}