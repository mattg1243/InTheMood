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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTokenCookie = void 0;
const spotify_1 = require("../utils/spotify");
const checkTokenCookie = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // check if the client has a valid token
    if (req.cookies.spotifyToken && new Date(Date.now()) > new Date(req.cookies.spotifyTokenExpiry)) {
        next();
    }
    else {
        console.log('  --- token expired, refreshing...');
        const response = yield (0, spotify_1.getToken)();
        const token = response.access_token;
        const tokenExpiry = new Date(new Date().getTime() + response.expires_in);
        res.cookie('spotifyToken', token).status(200);
        res.cookie('spotifyTokenExpiry', tokenExpiry);
        console.log('  --- token refresh complete, expires at ', tokenExpiry);
        next();
    }
});
exports.checkTokenCookie = checkTokenCookie;
