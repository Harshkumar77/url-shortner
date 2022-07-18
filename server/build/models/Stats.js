"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var statsSchema = new mongoose_1["default"].Schema({
    urlShorted: {
        type: Number,
        "default": 0,
        required: true
    },
    urlDigestIndex: {
        type: Number,
        "default": 0,
        required: true
    }
});
var Stats = mongoose_1["default"].model('Stats', statsSchema);
exports["default"] = Stats;
//# sourceMappingURL=Stats.js.map