"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AxiosErrorHandler_1 = __importDefault(require("../../utils/AxiosErrorHandler"));
const index_1 = require("../index");
const rootUrl = '/messages';
const message = {
    getAll: async (args) => {
        const { chat_id, token, user_id, query } = args;
        try {
            const res = await index_1.api.get(`${rootUrl}/${chat_id}?user_id=${user_id}${query ? `&&page_size=${query.page_size}&&page_number=${query.page_number}` : ''}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return res;
        }
        catch (error) {
            return (0, AxiosErrorHandler_1.default)(error);
        }
    },
    create: async (chat_id, user_id, message, token) => {
        try {
            return await index_1.api.post(`${rootUrl}/${chat_id}`, { user_id, message }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }
        catch (error) {
            return (0, AxiosErrorHandler_1.default)(error);
        }
    },
    update: async (message_id, user_id, newMessage, token) => {
        try {
            return await index_1.api.put(`${rootUrl}/${message_id}`, {
                data: { user_id, newMessage },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }
        catch (error) {
            return (0, AxiosErrorHandler_1.default)(error);
        }
    },
    delete: async (message_id, user_id, token) => {
        try {
            return await index_1.api.delete(`${rootUrl}/${message_id}`, {
                data: { user_id },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }
        catch (error) {
            return (0, AxiosErrorHandler_1.default)(error);
        }
    },
};
exports.default = message;
