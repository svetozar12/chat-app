"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const AxiosErrorHandler_1 = __importDefault(require("../../utils/AxiosErrorHandler"));
const rootUrl = '/chat-room';
const chats = {
    getAll: async (user_id, token) => {
        try {
            return await index_1.api.get(`${rootUrl}/?user_id=${user_id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
        }
        catch (error) {
            return (0, AxiosErrorHandler_1.default)(error);
        }
    },
    getById: async (chat_id, user_id, token) => {
        try {
            return await index_1.api.get(`${rootUrl}/${chat_id}?user_id=${user_id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
        }
        catch (error) {
            return (0, AxiosErrorHandler_1.default)(error);
        }
    },
    create: async (user, token) => {
        try {
            return await index_1.api.post(`${rootUrl}`, user, { headers: { Authorization: `Bearer ${token}` } });
        }
        catch (error) {
            return (0, AxiosErrorHandler_1.default)(error);
        }
    },
    update: async (message_id, user_id, token, username, usersData) => {
        try {
            if (usersData)
                return await index_1.api.put(`${rootUrl}/${message_id}`, { user_id, usersData }, { headers: { Authorization: `Bearer ${token}` } });
            return await index_1.api.put(`${rootUrl}/${message_id}`, { user_id, username }, {
                headers: { Authorization: `Bearer ${token}` },
            });
        }
        catch (error) {
            return (0, AxiosErrorHandler_1.default)(error);
        }
    },
    delete: async (message_id, user_id, token) => {
        try {
            return await index_1.api.delete(`${rootUrl}/${message_id}`, {
                headers: { Authorization: `Bearer ${token}` },
                data: { user_id },
            });
        }
        catch (error) {
            return (0, AxiosErrorHandler_1.default)(error);
        }
    },
};
exports.default = chats;
