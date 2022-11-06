"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const checkToken_1 = require("./middleware/checkToken");
const Recommend_handlers_1 = require("./handlers/Recommend.handlers");
// load .env variables
dotenv_1.default.config();
const PORT = process.env.PORT;
// initiate express app
const app = (0, express_1.default)();
// middleware
app.use((0, cookie_parser_1.default)());
app.use(checkToken_1.checkTokenCookie);
// server routes
// this is the route to hit in order to get the recommendations from Spotify
// see the handler function if you need to see how the response is sent
app.get('/api/recommend', Recommend_handlers_1.recommendSongsHandler);
// static routes
// these routes all send html pages to the browser
app.get('/features', (req, res, next) => {
    res.sendFile(path_1.default.join(__dirname, '../client/features.html'));
});
app.get('*', (req, res, next) => {
    res.sendFile(path_1.default.join(__dirname, '../client/index.html'));
});
// start the server on port 3000
app.listen(3000, () => {
    console.log(`  ---  server listening for requests on port ${PORT}  ---`);
});
