"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./Routes/user"));
const volunteers_1 = __importDefault(require("./Routes/volunteers"));
const workshops_1 = __importDefault(require("./Routes/workshops"));
const enrollment_1 = __importDefault(require("./Routes/enrollment"));
const meetings_1 = __importDefault(require("./Routes/meetings"));
const dashboard_1 = __importDefault(require("./Routes/dashboard"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use('/user', user_1.default);
app.use('/volunteers', volunteers_1.default);
app.use('/workshops', workshops_1.default);
app.use('/enrollments', enrollment_1.default);
app.use('/meetings', meetings_1.default);
app.use('/dashboard', dashboard_1.default);
app.listen(8080, () => {
    console.log('Listening on http://localhost:8080/');
});
