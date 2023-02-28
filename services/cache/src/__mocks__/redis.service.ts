import { productStub } from '../test/stub/product.stub';

export const RedisModule = jest.fn().mockRejectedValue({
  forRoot: jest.fn()
})