
import { loadSync } from '@grpc/proto-loader'
import { loadPackageDefinition, credentials } from '@grpc/grpc-js';
export function createClient<T>(protoPath: string[], options: any): T {

    const proto = loadSync('products.proto', {
        includeDirs: protoPath,
    }) as any;

    const protoGRPC = loadPackageDefinition(proto) as any;

    return new protoGRPC.product.ProductController(
        'localhost:5001',
        credentials.createInsecure(),
    );

}