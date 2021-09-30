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
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var route = express.Router();
var Invites = require("../../models/Invites.model");
var Users = require("../../models/User.model");
route.get("/invites/:id/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name_1, status_1, invites, _a, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                name_1 = req.params.id;
                status_1 = req.query.status;
                if (!(status_1 !== undefined)) return [3 /*break*/, 2];
                return [4 /*yield*/, Invites.find({
                        reciever: name_1,
                        status: status_1,
                    })];
            case 1:
                _a = _b.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, Invites.find({
                    reciever: name_1,
                }).select("status  inviter reciever")];
            case 3:
                _a = _b.sent();
                _b.label = 4;
            case 4:
                invites = _a;
                if (!invites || invites.length <= 0) {
                    return [2 /*return*/, res.status(404).json({
                            error: "You dont have invites .",
                        })];
                }
                return [2 /*return*/, res.json({ invites: invites }).status(201)];
            case 5:
                error_1 = _b.sent();
                return [2 /*return*/, res.status(501).json({
                        Error: "Internal server error",
                        Message: "Something went wrong",
                    })];
            case 6: return [2 /*return*/];
        }
    });
}); });
route.get("/invites/inviter/:id/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name_2, status_2, invites, _a, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                name_2 = req.params.id;
                status_2 = req.query.status;
                if (!(status_2 !== undefined)) return [3 /*break*/, 2];
                return [4 /*yield*/, Invites.find({
                        inviter: name_2,
                        status: status_2,
                    })];
            case 1:
                _a = _b.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, Invites.find({
                    inviter: name_2,
                }).select("status  inviter reciever")];
            case 3:
                _a = _b.sent();
                _b.label = 4;
            case 4:
                invites = _a;
                if (!invites || invites.length <= 0) {
                    return [2 /*return*/, res.status(404).json({
                            error: "You dont have accepted invites .",
                        })];
                }
                return [2 /*return*/, res.json({ invites: invites }).status(201)];
            case 5:
                error_2 = _b.sent();
                return [2 /*return*/, res.status(501).json({
                        Error: "Internal server error",
                        Message: "Something went wrong",
                    })];
            case 6: return [2 /*return*/];
        }
    });
}); });
route.put("/invites", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, status_3, inviteInstance, updateStatus, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = req.body.id;
                status_3 = req.body.status;
                return [4 /*yield*/, Invites.findOne({
                        id: id,
                    }).exec()];
            case 1:
                inviteInstance = _a.sent();
                if (!inviteInstance || undefined || !status_3) {
                    return [2 /*return*/, res.status(404).json({ error: "Not found" })];
                }
                return [4 /*yield*/, Invites.findByIdAndUpdate(id, {
                        status: status_3,
                    }, { new: true }).exec()];
            case 2:
                updateStatus = _a.sent();
                return [2 /*return*/, res.json({ message: updateStatus })];
            case 3:
                error_3 = _a.sent();
                res.status(501).json({
                    Error: "Internal server error",
                    Message: "Something went wrong",
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
route.post("/invites", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, checkInviteInstance, invites, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, Users.findOne({
                        username: req.body.reciever,
                    }).exec()];
            case 1:
                user = _a.sent();
                if (user === null) {
                    return [2 /*return*/, res.status(404).json({ ERROR: "User Not found" })];
                }
                return [4 /*yield*/, Invites.findOne({
                        id: user._id,
                        reciever: req.body.reciever,
                        inviter: req.body.inviter,
                        $or: [{ status: "recieved" }, { status: "accepted" }],
                    }).exec()];
            case 2:
                checkInviteInstance = _a.sent();
                // const findInvites = await Invites.findOne({
                //   id: user._id,
                //   reciever: req.body.reciever,
                //   inviter: req.body.inviter,
                //   $or: [{ status: "recieved" }, { status: "accepted" }],
                // }).exec();
                //check if findInvites and checkInviteInstance are equal
                if (checkInviteInstance) {
                    return [2 /*return*/, res.status(409).json({ ERROR: "Already sent" })];
                }
                if (req.body.reciever === req.body.inviter)
                    return [2 /*return*/, res.status(409).json({ ERROR: "Can't send invites to youurself" })];
                return [4 /*yield*/, new Invites({
                        reciever: req.body.reciever,
                        inviter: req.body.inviter,
                        status: req.body.status,
                    })];
            case 3:
                invites = _a.sent();
                return [4 /*yield*/, invites.save()];
            case 4:
                _a.sent();
                return [2 /*return*/, res.status(201).json({ message: invites })];
            case 5:
                error_4 = _a.sent();
                res.status(501).json({
                    Error: "Internal server error",
                    Message: "Something went wrong",
                });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
module.exports = route;
