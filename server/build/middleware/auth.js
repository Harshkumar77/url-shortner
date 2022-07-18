"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.verifyUser = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var JWT_KEY = process.env.JWT_KEY;
var verifyUser = function (req, res, next) {
    if (!req.headers["authorization"]) {
        res.status(400).json({ message: "no authorization header provided" });
        return;
    }
    if (!req.headers["authorization"].startsWith("Bearer ")) {
        res.status(400).json({ message: "provide authorization properly" });
        return;
    }
    var access_token = req.headers["authorization"].split(" ").pop();
    try {
        var jwtResult = jsonwebtoken_1["default"].verify(access_token, JWT_KEY);
        req.user = { id: jwtResult.id };
        next();
    }
    catch (error) {
        console.log(error.name);
        if (error.name == "TokenExpiredError") {
            res.status(403).send(error);
            return;
        }
        res.status(400).send(error);
    }
};
exports.verifyUser = verifyUser;
//# sourceMappingURL=auth.js.map