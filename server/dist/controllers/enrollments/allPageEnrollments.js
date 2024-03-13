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
const global_1 = require("../../utils/global");
const getData_1 = __importDefault(require("../../utils/getData"));
const queries_1 = require("../../gql/enrollments/queries");
const allPageEnrollments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const { page: reqPage, no_of_records: reqRecords, sort_by, order_of_sort, gender, value } = req === null || req === void 0 ? void 0 : req.query;
    let order = {
        id: "desc"
    };
    let filters = {};
    let page = 1;
    let no_of_records = 20;
    if (sort_by && order_of_sort) {
        const sort = `${sort_by}`;
        order = {};
        order[sort] = order_of_sort;
        if (sort_by === 'children') {
            order = {
                children_aggregate: {
                    count: order_of_sort
                }
            };
        }
    }
    else if (sort_by) {
        const sort = `${sort_by}`;
        order = {};
        order[sort] = "asc";
        if (sort_by === 'children') {
            order = {
                children_aggregate: {
                    count: "asc"
                }
            };
        }
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
        filters = {
            gender: {
                _eq: gender
            }
        };
    }
    if (value) {
        let phone = value;
        const email = phone.toLowerCase();
        const name = (0, global_1.capitaliseStr)(phone);
        filters = Object.assign(Object.assign({}, filters), { _or: [
                {
                    email: {
                        _like: `${email}%`
                    }
                },
                {
                    name: {
                        _like: `${name}%`
                    }
                },
                {
                    mobile_number: {
                        _like: `${phone}%`
                    }
                },
                {
                    state: {
                        _like: `${name}%`
                    }
                }
            ] });
    }
    const variables = {
        offset: (page - 1) * no_of_records,
        limit: no_of_records,
        where: filters,
        order_by: order
    };
    const data = yield (0, getData_1.default)(queries_1.allEnrollments, variables);
    if (data === null || data === void 0 ? void 0 : data.errors) {
        return res.status(400).json({
            status: 'error',
            message: (_a = data === null || data === void 0 ? void 0 : data.errors[0]) === null || _a === void 0 ? void 0 : _a.message
        });
    }
    const enrollments = (_c = (_b = data === null || data === void 0 ? void 0 : data.data) === null || _b === void 0 ? void 0 : _b.enrollments) === null || _c === void 0 ? void 0 : _c.map((enrl) => {
        var _a, _b;
        return {
            address: enrl === null || enrl === void 0 ? void 0 : enrl.address,
            city: enrl === null || enrl === void 0 ? void 0 : enrl.city,
            dob: enrl === null || enrl === void 0 ? void 0 : enrl.dob,
            email: enrl === null || enrl === void 0 ? void 0 : enrl.email,
            gender: enrl === null || enrl === void 0 ? void 0 : enrl.gender,
            id: enrl === null || enrl === void 0 ? void 0 : enrl.id,
            mobile_number: enrl === null || enrl === void 0 ? void 0 : enrl.mobile_number,
            name: enrl === null || enrl === void 0 ? void 0 : enrl.name,
            pincode: enrl === null || enrl === void 0 ? void 0 : enrl.pincode,
            state: enrl === null || enrl === void 0 ? void 0 : enrl.state,
            children: (_b = (_a = enrl === null || enrl === void 0 ? void 0 : enrl.children_aggregate) === null || _a === void 0 ? void 0 : _a.aggregate) === null || _b === void 0 ? void 0 : _b.count
        };
    });
    return res.status(200).json({
        status: "success",
        message: "Data fetched successfully!",
        data: {
            enrollments,
            total_pages: Math.ceil(((_f = (_e = (_d = data === null || data === void 0 ? void 0 : data.data) === null || _d === void 0 ? void 0 : _d.enrollments_aggregate) === null || _e === void 0 ? void 0 : _e.aggregate) === null || _f === void 0 ? void 0 : _f.count) / no_of_records),
            current_page: page
        }
    });
});
exports.default = allPageEnrollments;
