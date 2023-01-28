import * as couchbase from "couchbase"
import type { Cluster } from "couchbase"
const { connect, PasswordAuthenticator } = couchbase
/**
 * @description connect to a couchbase cluster
 * @todo use env instead static string
 * @returns { Promise<Cluster> } returns connected cluster
 */
export async function ConnectToProductCluster(): Promise<Cluster> {
    return await connect("couchbase://127.0.0.1", new PasswordAuthenticator("Administrator", "asdfgh"))
}

export default couchbase