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
const getData_1 = __importDefault(require("../../utils/getData"));
const mutations_1 = require("../../gql/volunteers/mutations");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const deleteVolunteer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { authorization } = req === null || req === void 0 ? void 0 : req.headers;
    const { emails } = req.body;
    let token;
    try {
        let authToken = authorization;
        authToken = authToken.split('Bearer ');
        authToken = authToken[1];
        token = jsonwebtoken_1.default.verify(authToken, process.env.JWT_SECRET_KEY || '');
    }
    catch (err) {
        return res.status(401).json({
            status: 'error',
            message: 'Token expired! Please login again.'
        });
    }
    const volunteers = emails === null || emails === void 0 ? void 0 : emails.reduce((current, email) => {
        if ((token === null || token === void 0 ? void 0 : token.email) !== email) {
            current.push({
                email: {
                    _eq: email
                }
            });
        }
        return current;
    }, []);
    if ((volunteers === null || volunteers === void 0 ? void 0 : volunteers.length) === 0) {
        return res.status(403).json({
            status: 'error',
            message: 'You cannot delete yourself!'
        });
    }
    const variables = {
        where: {
            _or: [...volunteers],
            isVerified: {
                _eq: true
            }
        },
        where1: {
            _or: [...volunteers]
        }
    };
    const data = yield (0, getData_1.default)(mutations_1.DeleteVolunteersByEmail, variables);
    if (data === null || data === void 0 ? void 0 : data.errors) {
        return res.status(400).json({
            status: 'error',
            message: (_a = data === null || data === void 0 ? void 0 : data.errors[0]) === null || _a === void 0 ? void 0 : _a.message
        });
    }
    if ((_c = (_b = data === null || data === void 0 ? void 0 : data.data) === null || _b === void 0 ? void 0 : _b.delete_users) === null || _c === void 0 ? void 0 : _c.affected_rows) {
        return res.status(200).json({
            status: 'success',
            message: "Users deleted successfully!"
        });
    }
    return res.status(400).json({
        status: 'error',
        message: "Users you are deleting is not found at the moment. Please try again later!"
    });
});
exports.default = deleteVolunteer;
