"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AxiosErrorHandler_1 = __importDefault(require("../../utils/AxiosErrorHandler"));
const index_1 = require("../index");
const rootUrl = '/invites';
const invite = {
    getAllByReciever: async (user_id, token, status) => {
        try {
            return await index_1.api.get(`${rootUrl}/${user_id}${status ? '?status='.concat(status) : ''}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
        }
        catch (error) {
            return (0, AxiosErrorHandler_1.default)(error);
        }
    },
    getAllByInviter: async (user_id, token, status) => {
        try {
            return await index_1.api.get(`${rootUrl}/inviter/${user_id}${status ? '?'.concat(status) : ''}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
        }
        catch (error) {
            return (0, AxiosErrorHandler_1.default)(error);
        }
    },
    create: async (user_id, reciever, token) => {
        try {
            return await index_1.api.post(`${rootUrl}`, { reciever, user_id }, {
                headers: { Authorization: `Bearer ${token}` },
            });
        }
        catch (error) {
            return (0, AxiosErrorHandler_1.default)(error);
        }
    },
    createGroupChat: async (usersData) => {
        try {
            return await index_1.api.post(`${rootUrl}/group-chat`, {
                data: { usersData },
            });
        }
        catch (error) {
            return (0, AxiosErrorHandler_1.default)(error);
        }
    },
    update: async (user_id, invite_id, status, token) => {
        try {
            return await index_1.api.put(`${rootUrl}/${invite_id}`, { status, user_id }, {
                headers: { Authorization: `Bearer ${token}` },
            });
        }
        catch (error) {
            return (0, AxiosErrorHandler_1.default)(error);
        }
    },
};
exports.default = invite;
