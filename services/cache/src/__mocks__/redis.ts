export const Redis = jest.fn().mockRejectedValue({
    get: jest.fn().mockImplementation(async (id: string): Promise<any> => ({}))
})