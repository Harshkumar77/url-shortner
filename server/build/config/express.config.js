"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.configureApp = void 0;
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var passport_1 = __importDefault(require("passport"));
var mongoose_1 = __importDefault(require("mongoose"));
var express_1 = __importDefault(require("express"));
var passport_config_1 = require("./passport.config");
var morgan_1 = __importDefault(require("morgan"));
var configureApp = function (app) {
    app.use(express_1["default"].urlencoded({ extended: false }));
    app.use(express_1["default"].json());
    app.use((0, cookie_parser_1["default"])());
    app.use(passport_1["default"].initialize());
    app.use((0, morgan_1["default"])("dev"));
    app.use(express_1["default"].static("dist"));
    var _a = process.env, DATABASE_URL = _a.DATABASE_URL, PORT = _a.PORT, GOOGLE_CLIENT_ID = _a.GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET = _a.GOOGLE_CLIENT_SECRET, JWT_KEY = _a.JWT_KEY, NODE_ENV = _a.NODE_ENV;
    if (!DATABASE_URL ||
        !PORT ||
        !GOOGLE_CLIENT_ID ||
        !GOOGLE_CLIENT_SECRET ||
        !JWT_KEY ||
        !NODE_ENV)
        throw Error("Check enviornment variables");
    app.listen(PORT, function () {
        return console.log("Server started at http://localhost:".concat(PORT));
    });
    mongoose_1["default"].connect(DATABASE_URL, function (err) {
        if (err)
            console.error(err.message);
        else
            console.log("Connected to database");
    });
    (0, passport_config_1.configurePassport)();
};
exports.configureApp = configureApp;
//# sourceMappingURL=express.config.js.map