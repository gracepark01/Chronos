"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var DockerSchema = new Schema({
    containername: {
        type: String,
        required: true,
    },
    containerid: {
        type: String,
        required: true,
    },
    platform: {
        type: String,
        required: true,
    },
    starttime: {
        type: String,
        required: true,
    },
    memoryusage: {
        type: Number,
        required: true,
    },
    memorylimit: {
        type: Number,
        required: true,
    },
    memorypercent: {
        type: Number,
        required: true,
    },
    cpupercent: {
        type: Number,
        required: true,
    },
    networkreceived: {
        type: Number,
        required: true,
    },
    networksent: {
        type: Number,
        required: true,
    },
    processcount: {
        type: Number,
        required: true,
    },
    restartcount: {
        type: Number,
        required: true,
    },
});
var DockerModelFunc = function (serviceName) { return mongoose_1.default.model(serviceName + "-containerinfos", DockerSchema); };
exports.default = DockerModelFunc;
//# sourceMappingURL=DockerModel.js.map