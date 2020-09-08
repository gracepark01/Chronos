"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
// Mongoose connection wrapped in function that takes the index of the selected database as the parameter. This index is used to target the correct database for querying.
var connectMongoose = function (i, URI) {
    return mongoose_1.default.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
        if (err)
            console.log(err);
        console.log('Connected to Mongo database!');
    });
};
exports.default = connectMongoose;
//# sourceMappingURL=mongo.js.map