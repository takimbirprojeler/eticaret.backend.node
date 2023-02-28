import { Product } from '@libs/entities';

export interface ICacheInput {
  id?: string;
  cache?: {
    product?: Product;
  };
  ttl?: number;
}

export interface ICache {
  product?: Product;
  products?: Product[];
  error?: {
    message: string;
    code: string;
  };
}
