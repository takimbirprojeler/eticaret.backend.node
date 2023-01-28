"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectToProductCluster = void 0;
const tslib_1 = require("tslib");
const couchbase = tslib_1.__importStar(require("couchbase"));
const { connect, PasswordAuthenticator } = couchbase;
/**
 * @description connect to a couchbase cluster
 * @todo use env instead static string
 * @returns { Promise<Cluster> } returns connected cluster
 */
function ConnectToProductCluster() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return yield connect("couchbase://127.0.0.1", new PasswordAuthenticator("Administrator", "asdfgh"));
    });
}
exports.ConnectToProductCluster = ConnectToProductCluster;
exports.default = couchbase;
//# sourceMappingURL=index.js.map