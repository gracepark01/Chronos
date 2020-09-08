"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var HealthSchema = new Schema({
    cpuspeed: {
        type: Number,
        default: 0,
    },
    cputemp: {
        type: Number,
        default: 0,
    },
    cpuloadpercent: {
        type: Number,
        default: 0,
    },
    totalmemory: {
        type: Number,
        default: 0,
    },
    freememory: {
        type: Number,
        default: 0,
    },
    usedmemory: {
        type: Number,
        default: 0,
    },
    activememory: {
        type: Number,
        default: 0,
    },
    totalprocesses: {
        type: Number,
        default: 0,
    },
    runningprocesses: {
        type: Number,
        default: 0,
    },
    blockedprocesses: {
        type: Number,
        default: 0,
    },
    sleepingprocesses: {
        type: Number,
        default: 0,
    },
    latency: {
        type: Number,
        default: 0,
    },
    time: {
        type: Date,
        default: Date.now,
    },
});
var HealthModelFunc = function (serviceName) { return mongoose_1.default.model(serviceName, HealthSchema); };
exports.default = HealthModelFunc;
//# sourceMappingURL=HealthModel.js.map