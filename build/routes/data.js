"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var postgres_1 = __importDefault(require("../databases/postgres"));
var mongo_1 = __importDefault(require("../databases/mongo"));
var CommunicationsModel_1 = __importDefault(require("../models/CommunicationsModel"));
var HealthModel_1 = __importDefault(require("../models/HealthModel"));
var ServicesModel_1 = __importDefault(require("../models/ServicesModel"));
var DockerModel_1 = __importDefault(require("../models/DockerModel"));
// Initiate pool variable for SQL setup
var pool;
// Stores database type: 1) MongoDB or 2) SQL
var currentDatabaseType;
/**
 * @event   connect
 * @desc    Connects user to database and sets global currentDatabaseType which
 *          is accessed in info.commsData and info.healthData
 */
electron_1.ipcMain.on('connect', function (message, index) { return __awaiter(void 0, void 0, void 0, function () {
    var fileContents, userDatabase, _a, databaseType, URI, _b, message_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 5, , 6]);
                console.log('Attempting to connect to DB');
                fileContents = fs_1.default.readFileSync(path_1.default.resolve(__dirname, '../user/settings.json'), 'utf8');
                userDatabase = JSON.parse(fileContents).services[index];
                _a = [userDatabase[1], userDatabase[2]], databaseType = _a[0], URI = _a[1];
                if (!(databaseType === 'MongoDB')) return [3 /*break*/, 2];
                return [4 /*yield*/, mongo_1.default(index, URI)];
            case 1:
                _c.sent();
                _c.label = 2;
            case 2:
                if (!(databaseType === 'SQL')) return [3 /*break*/, 4];
                return [4 /*yield*/, postgres_1.default(index, URI)];
            case 3:
                pool = _c.sent();
                _c.label = 4;
            case 4:
                console.log('connected?');
                // Currently set to a global variable
                currentDatabaseType = databaseType;
                return [3 /*break*/, 6];
            case 5:
                _b = _c.sent();
                message_1 = _b.message;
                console.log('Error in "connect" event', message_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
/**
 * @event   serviceRequest/serviceResponse
 * @desc    Query to services table for all microservices of a specific app
 */
electron_1.ipcMain.on('servicesRequest', function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var result, query, _a, message_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                console.log('Requesting application microservices');
                result = void 0;
                if (!(currentDatabaseType === 'MongoDB')) return [3 /*break*/, 2];
                return [4 /*yield*/, ServicesModel_1.default.find()];
            case 1:
                // Get all documents from the services collection
                result = _b.sent();
                _b.label = 2;
            case 2:
                if (!(currentDatabaseType === 'SQL')) return [3 /*break*/, 4];
                query = "SELECT * FROM services";
                return [4 /*yield*/, pool.query(query)];
            case 3:
                result = _b.sent();
                result = result.rows;
                _b.label = 4;
            case 4:
                // Async event emitter - send response
                message.sender.send('servicesResponse', JSON.stringify(result));
                return [3 /*break*/, 6];
            case 5:
                _a = _b.sent();
                message_2 = _a.message;
                console.log('Error in "servicesRequest" event', message_2);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
/**
 * @event   commsRequest/commsResponse
 * @desc    Query for all communication data
 */
electron_1.ipcMain.on('commsRequest', function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var result, getCommunications, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                console.log("Requesting communication data");
                result = void 0;
                if (!(currentDatabaseType === 'MongoDB')) return [3 /*break*/, 2];
                return [4 /*yield*/, CommunicationsModel_1.default.find().exec()];
            case 1:
                // Get all documents
                result = _a.sent();
                _a.label = 2;
            case 2:
                if (!(currentDatabaseType === 'SQL')) return [3 /*break*/, 4];
                getCommunications = 'SELECT * FROM communications';
                return [4 /*yield*/, pool.query(getCommunications)];
            case 3:
                result = _a.sent();
                result = result.rows;
                _a.label = 4;
            case 4:
                // Async event emitter - send response
                message.sender.send('commsResponse', JSON.stringify(result));
                return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                // Catch errors
                console.log('Error in "commeRequest" event', message);
                message.sender.send('commsResponse', {});
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
/**
 * @event   healthRequest/healthResponse
 * @desc    Query for health data for a particular microservice (last 50 data points)
 */
electron_1.ipcMain.on('healthRequest', function (message, service) { return __awaiter(void 0, void 0, void 0, function () {
    var result, num, query, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                console.log("Requesting microservice health for \"" + service + "\"");
                result = void 0;
                if (!(currentDatabaseType === 'MongoDB')) return [3 /*break*/, 3];
                return [4 /*yield*/, HealthModel_1.default(service).countDocuments()];
            case 1:
                num = _a.sent();
                // Get last 50 documents. If less than 50 documents, get all
                num = Math.max(num, 10);
                return [4 /*yield*/, HealthModel_1.default(service)
                        .find()
                        .skip(num - 10)];
            case 2:
                result = _a.sent();
                _a.label = 3;
            case 3:
                if (!(currentDatabaseType === 'SQL')) return [3 /*break*/, 5];
                query = "\n          SELECT * FROM " + service + "\n          ORDER BY _id DESC\n          LIMIT 50";
                return [4 /*yield*/, pool.query(query)];
            case 4:
                // Execute query
                result = _a.sent();
                result = result.rows.reverse();
                _a.label = 5;
            case 5:
                // Async event emitter - send response
                message.sender.send('healthResponse', JSON.stringify(result));
                return [3 /*break*/, 7];
            case 6:
                error_2 = _a.sent();
                // Catch errors
                console.log('Error in "healthRequest" event', message);
                message.sender.send('healthResponse', {});
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
/**
 * @event   dockerRequest/DockerResponse
 * @desc    Query for health data for a particular microservice (last 50 data points)
 */
electron_1.ipcMain.on('dockerRequest', function (message, service) { return __awaiter(void 0, void 0, void 0, function () {
    var result, num, query, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                console.log("Requesting container information for \"" + service + "\"");
                result = void 0;
                if (!(currentDatabaseType === 'MongoDB')) return [3 /*break*/, 3];
                return [4 /*yield*/, DockerModel_1.default(service).countDocuments()];
            case 1:
                num = _a.sent();
                //Get last 50 documents. If less than 50 documents, get all
                num = Math.max(num, 50);
                return [4 /*yield*/, DockerModel_1.default(service).find().skip(num - 50)];
            case 2:
                result = _a.sent();
                _a.label = 3;
            case 3:
                if (!(currentDatabaseType === 'SQL')) return [3 /*break*/, 5];
                query = "\n          SELECT * FROM " + service + "\n          ORDER BY _id DESC\n          LIMIT 50";
                return [4 /*yield*/, pool.query(query)];
            case 4:
                // Execute query
                result = _a.sent();
                result = result.rows.reverse();
                _a.label = 5;
            case 5:
                // Async event emitter - send response
                message.sender.send('dockerResponse', JSON.stringify(result));
                return [3 /*break*/, 7];
            case 6:
                error_3 = _a.sent();
                // Catch errors
                console.log('Error in "dockerRequest" event', message);
                message.sender.send('dockerResponse', {});
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=data.js.map