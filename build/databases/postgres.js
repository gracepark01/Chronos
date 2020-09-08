"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
// SQL connection wrapped in function that takes the index of the selected database as the parameter. This index is used to target the correct database for querying.
var connectSQL = function (i, URI) {
    return new pg_1.Pool({
        connectionString: URI,
    });
};
exports.default = connectSQL;
//# sourceMappingURL=postgres.js.map