
interface CacheError {
    message: string,
    code: string
}

export interface CacheGetResponse {
    response: {
        data: Cache
    }
}

export interface CacheGetErrorResponse {
    response: {
        cache: null,
        error: CacheError
    }
}
export interface CacheGetInput {
    key: string
}

export interface CacheSetInput {
    key: string,
    ttl: number,
    cache: Cache
}

export interface CacheSetResponse {
    response: {
        data: {
            key: string
        }
    }
}

export interface CacheSetErrorResponse {
    response: {
        data: null,
        error: CacheError
    }
}


