"use strict";
exports.__esModule = true;
var auth_route_1 = require("./auth.route");
var redirect_route_1 = require("./redirect.route");
var url_route_1 = require("./url.route");
var addRoutes = function (app) {
    app.use(auth_route_1.authRouter);
    app.use(url_route_1.urlRouter);
    app.use(redirect_route_1.redirectRouter);
};
exports["default"] = addRoutes;
//# sourceMappingURL=index.js.map