"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
require("dotenv/config");
var express_1 = __importDefault(require("express"));
var express_config_1 = require("./config/express.config");
var routes_1 = __importDefault(require("./routes"));
var app = (0, express_1["default"])();
(0, express_config_1.configureApp)(app);
(0, routes_1["default"])(app);
//# sourceMappingURL=index.js.map