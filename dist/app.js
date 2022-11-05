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
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const spotify_1 = require("./utils/spotify");
const app = (0, express_1.default)();
app.get('/token', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, spotify_1.getToken)();
        res.json(response);
    }
    catch (err) {
        console.error(err);
    }
}));
app.get('*', (req, res, next) => {
    res.sendFile(path_1.default.join(__dirname, '../client/index.html'));
});
app.listen(3000);
