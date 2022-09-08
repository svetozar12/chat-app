"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const AxiosErrorHandler_1 = __importDefault(require("../../utils/AxiosErrorHandler"));
const rootUrl = '/auth';
const auth = {
    login: async (userCredentials) => {
        try {
            const res = await __1.api.post(`${rootUrl}/login`, userCredentials);
            return res;
        }
        catch (error) {
            return (0, AxiosErrorHandler_1.default)(error);
        }
    },
    refresh: async (id, refresh_token) => {
        try {
            const res = await __1.api.post(`${rootUrl}/refresh/${id}`, undefined, { headers: { Authorization: `Bearer ${refresh_token}` } });
            return res;
        }
        catch (error) {
            return (0, AxiosErrorHandler_1.default)(error);
        }
    },
    logout: async (id, token) => {
        try {
            const res = await __1.api.post(`${rootUrl}/logout/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            return res;
        }
        catch (error) {
            return (0, AxiosErrorHandler_1.default)(error);
        }
    },
};
exports.default = auth;
