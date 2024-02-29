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
const queries_1 = require("../../gql/volunteers/queries");
const global_1 = require("../../utils/global");
const getFilteredVolunteers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const { gender, isAdminVerified, isAdmin, yoj, email, name, state, phone, page: reqPage, no_of_records: reqRecords, sort_by, order_of_sort } = req.query;
    let order = {
        id: "desc"
    };
    let filters = {
        isVerified: {
            _eq: true
        }
    };
    let page = 1;
    let no_of_records = 20;
    if (sort_by && order_of_sort) {
        const sort = `${sort_by}`;
        order = {};
        order[sort] = order_of_sort;
    }
    else if (sort_by) {
        const sort = `${sort_by}`;
        order = {};
        order[sort] = "asc";
    }
    else if (order_of_sort) {
        order = { id: order_of_sort };
    }
    if (reqPage && reqRecords) {
        page = +reqPage;
        no_of_records = +reqRecords;
    }
    else if (reqPage) {
        page = +reqPage;
    }
    else if (reqRecords) {
        no_of_records = +reqRecords;
    }
    if (gender) {
        filters = Object.assign(Object.assign({}, filters), { gender: {
                _eq: gender
            } });
    }
    if (isAdminVerified) {
        filters = Object.assign(Object.assign({}, filters), { isAdminVerified: {
                _eq: isAdminVerified === 'true' ? true : false
            } });
    }
    if (isAdmin) {
        filters = Object.assign(Object.assign({}, filters), { isAdmin: {
                _eq: isAdmin === 'null' ? null : (isAdmin === 'true' ? true : false)
            } });
    }
    if (yoj) {
        filters = Object.assign(Object.assign({}, filters), { yearOfJoining: {
                _eq: +yoj
            } });
    }
    if (email) {
        let mail = email;
        mail = mail.toLowerCase();
        filters = Object.assign(Object.assign({}, filters), { email: {
                _like: `${mail}%`
            } });
    }
    if (name) {
        let nme = name;
        nme = (0, global_1.capitaliseStr)(nme);
        filters = Object.assign(Object.assign({}, filters), { name: {
                _like: `${nme}%`
            } });
    }
    if (state) {
        let nme = state;
        nme = (0, global_1.capitaliseStr)(nme);
        filters = Object.assign(Object.assign({}, filters), { state: {
                _like: `${nme}%`
            } });
    }
    if (phone) {
        filters = Object.assign(Object.assign({}, filters), { phoneNumber: {
                _like: `${phone}%`
            } });
    }
    const variables = {
        offset: (page - 1) * no_of_records,
        limit: no_of_records,
        where: filters,
        order_by: order
    };
    const data = yield (0, getData_1.default)(queries_1.filterVolunteersQuery, variables);
    if (data === null || data === void 0 ? void 0 : data.errors) {
        return res.status(400).json({
            status: 'error',
            message: (_a = data === null || data === void 0 ? void 0 : data.errors[0]) === null || _a === void 0 ? void 0 : _a.message
        });
    }
    return res.status(200).json({
        status: 'success',
        message: 'Data fetched successfully!',
        data: {
            users: (_b = data === null || data === void 0 ? void 0 : data.data) === null || _b === void 0 ? void 0 : _b.users,
            total_pages: Math.ceil(((_e = (_d = (_c = data === null || data === void 0 ? void 0 : data.data) === null || _c === void 0 ? void 0 : _c.users_aggregate) === null || _d === void 0 ? void 0 : _d.aggregate) === null || _e === void 0 ? void 0 : _e.count) / no_of_records),
            current_page: page
        }
    });
});
exports.default = getFilteredVolunteers;
