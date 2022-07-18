"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.authRouter = void 0;
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var auth_1 = require("../middleware/auth");
exports.authRouter = express_1["default"].Router();
var refreshTokens = [];
var JWT_KEY = process.env.JWT_KEY;
exports.authRouter.get("/auth/google", passport_1["default"].authenticate("google", {
    scope: ["email", "profile"],
    session: false
}));
exports.authRouter.get("/auth/callback", passport_1["default"].authenticate("google", {
    session: false
}), function (req, res) {
    if (!req.user) {
        res.status(500);
        return;
    }
    var refreshToken = jsonwebtoken_1["default"].sign({
        id: req.user.id
    }, process.env.JWT_KEY, {
        expiresIn: "10day"
    });
    refreshTokens.push(refreshToken);
    res.cookie("refreshToken", refreshToken, {
        secure: true,
        httpOnly: true
    });
    if (process.env.NODE_ENV === "dev")
        res.redirect("http://localhost:3000");
    else
        res.redirect("/");
});
exports.authRouter.get("/auth/user", auth_1.verifyUser, function (req, res) {
    res.send(req.user);
});
exports.authRouter.post("/auth/access_token", function (req, res) {
    try {
        var jwtResult = jsonwebtoken_1["default"].verify(req.cookies.refreshToken, JWT_KEY);
        var access_token = jsonwebtoken_1["default"].sign({ id: jwtResult.id }, JWT_KEY, {
            expiresIn: "10min"
        });
        res.json({ access_token: access_token });
    }
    catch (error) {
        console.log(error.name);
        if (error.name == "TokenExpiredError") {
            res.status(403).send(error);
        }
        else
            res.status(400).send(error);
    }
});
//# sourceMappingURL=auth.route.js.map