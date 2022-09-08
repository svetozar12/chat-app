"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AxiosErrorHandler_1 = __importDefault(require("../../utils/AxiosErrorHandler"));
const index_1 = require("../index");
const rootUrl = '/users';
const user = {
    getById: async (id, token) => {
        try {
            return await index_1.api.get(`${rootUrl}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        }
        catch (error) {
            return (0, AxiosErrorHandler_1.default)(error);
        }
    },
    create: async (user) => {
        try {
            return await index_1.api.post(`${rootUrl}`, user);
        }
        catch (error) {
            return (0, AxiosErrorHandler_1.default)(error);
        }
    },
    update: async (user, id, token) => {
        try {
            return await index_1.api.put(`${rootUrl}/${id}`, user, { headers: { Authorization: `Bearer ${token}` } });
        }
        catch (error) {
            return (0, AxiosErrorHandler_1.default)(error);
        }
    },
    delete: async (id, token) => {
        try {
            return await index_1.api.delete(`${rootUrl}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        }
        catch (error) {
            return (0, AxiosErrorHandler_1.default)(error);
        }
    },
};
exports.default = user;
