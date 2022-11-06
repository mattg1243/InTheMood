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
exports.recommendSongsHandler = void 0;
const spotify_1 = require("../utils/spotify");
const recommendSongsHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const mood = req.query.mood;
    // need to find a better, TypeScript way to do this check
    if (mood !== 'happy' && mood !== 'sad' && mood !== 'angry') {
        return res.status(400).json({ message: 'please send mood as either happy, sad, or angry' });
    }
    try {
        const recomendations = yield (0, spotify_1.getRecommendations)(mood, req.cookies.spotifyToken);
        res.status(200).json(recomendations);
    }
    catch (err) {
        res.status(503).json(err);
        console.error(err);
    }
});
exports.recommendSongsHandler = recommendSongsHandler;
