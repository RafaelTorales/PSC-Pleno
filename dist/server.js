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
const sequelize_1 = __importDefault(require("./infra/sequelize/sequelize"));
const router_1 = __importDefault(require("./interfaces/router"));
const app = (0, express_1.default)();
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
app.use((_, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize_1.default.authenticate();
        next();
    }
    catch (error) {
        res.status(503).json({
            message: "Problemas de conexão. Entre em contato com um administrador, ou tente novamente mais tarde.",
        });
    }
}));
app.use((0, router_1.default)());
