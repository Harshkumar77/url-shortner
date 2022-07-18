"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.clientRouter = void 0;
var express_1 = __importDefault(require("express"));
exports.clientRouter = express_1["default"].Router();
function sendClientCode(req, res) {
    res.sendFile("build/index.html");
}
exports.clientRouter.post("/", sendClientCode);
//# sourceMappingURL=client.route.js.map