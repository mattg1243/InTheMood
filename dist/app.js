"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// middleware
const checkToken_1 = require("./middleware/checkToken");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.post('/recommend', checkToken_1.checkTokenCookie, (req, res, next) => {
    res.json(200).json('got it!');
});
app.get('/features', checkToken_1.checkTokenCookie, (req, res, next) => {
    res.sendFile(path_1.default.join(__dirname, '../client/features.html'));
});
// app.get('/token', async (req: Request, res: Response, next: NextFunction) => {
//   console.log('token req');
// });
app.get('*', checkToken_1.checkTokenCookie, (req, res, next) => {
    res.sendFile(path_1.default.join(__dirname, '../client/index.html'));
});
app.listen(3000);
