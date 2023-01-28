import * as couchbase from "couchbase";
import type { Cluster } from "couchbase";
/**
 * @description connect to a couchbase cluster
 * @todo use env instead static string
 * @returns { Promise<Cluster> } returns connected cluster
 */
export declare function ConnectToProductCluster(): Promise<Cluster>;
export default couchbase;
//# sourceMappingURL=index.d.ts.map