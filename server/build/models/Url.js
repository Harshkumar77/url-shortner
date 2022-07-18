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
exports.__esModule = true;
exports.PopulateUrlIds = exports.urlSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var User_1 = __importDefault(require("./User"));
var Stats_1 = __importDefault(require("./Stats"));
var crypto_1 = require("crypto");
exports.urlSchema = new mongoose_1["default"].Schema({
    url: {
        type: String,
        required: true
    },
    short: {
        type: String,
        "default": "",
        unique: true
    },
    expiringAt: {
        type: Date
    },
    clicks: {
        type: Number,
        "default": 0
    },
    generatedBy: {
        type: mongoose_1["default"].Types.ObjectId,
        ref: User_1["default"],
        "default": process.env.RANDOM_ACCOUNT_ID
    },
    favicon: String
});
exports.urlSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function () {
        var stats, foundUnique, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!this.isNew)
                        return [2 /*return*/, next()];
                    return [4 /*yield*/, Stats_1["default"].findOne({})];
                case 1:
                    stats = _a.sent();
                    if (stats == null || stats.urlDigestIndex == null || stats.urlShorted == null)
                        throw new Error("Something wrong with Stats");
                    foundUnique = true;
                    // let short = ""
                    // while (foundUnique) {
                    //     short = createHash('md5').update("" + stats.urlDigestIndex++).digest('base64url').slice(0, 6)
                    //     stats.urlDigestIndex++
                    //     if (await mongoose.models['Url'].where('short').equals(short) != null) {
                    //         console.log(short);
                    //         continue
                    //     }
                    //     foundUnique = false
                    // }
                    // todo:code for collison
                    this.short = (0, crypto_1.createHash)("md5")
                        .update("" + stats.urlDigestIndex++)
                        .digest("base64url")
                        .slice(0, 6);
                    if (stats == null || stats.urlShorted == null)
                        throw new Error("Something wrong with Stats");
                    stats.urlShorted++;
                    return [4 /*yield*/, User_1["default"].findById(this.generatedBy)];
                case 2:
                    user = _a.sent();
                    if (user == null)
                        throw Error("Check user ".concat(this.generatedBy, " or something went wrong"));
                    user.urls.push(this.id);
                    user.save();
                    next();
                    stats.save();
                    return [2 /*return*/];
            }
        });
    });
});
// urlSchema.post("save", async function (doc, next) {
//   if (!this.isNew) return next()
// })
var Url = mongoose_1["default"].model("Url", exports.urlSchema);
exports["default"] = Url;
var PopulateUrlIds = function (ids) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, Promise.all(ids.map(function (id) { return Url.findById(id).exec(); }))];
}); }); };
exports.PopulateUrlIds = PopulateUrlIds;
//# sourceMappingURL=Url.js.map