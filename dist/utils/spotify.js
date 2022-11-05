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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = void 0;
const axios_1 = __importDefault(require("axios"));
const client_id = process.env.API_CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const getToken = () => __awaiter(void 0, void 0, void 0, function* () {
    let formData = new FormData();
    formData.append('grant_type', 'client_credentials');
    const authHeader = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
    console.log(authHeader);
    const response = yield (0, axios_1.default)({
        method: 'POST',
        url: 'https://accounts.spotify.com/api/token',
        data: { grant_type: 'client_credentials' },
        headers: {
            Authorization: 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    return response;
});
exports.getToken = getToken;
