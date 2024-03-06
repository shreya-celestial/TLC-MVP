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
const queries_1 = require("../../gql/workshops/queries");
const global_1 = require("../../utils/global");
const allPageWorkshops = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const { page: reqPage, no_of_records: reqRecords, sort_by, order_of_sort, pastOrUpcoming, value } = req.query;
    let page = 1;
    let no_of_records = 20;
    let filters = {};
    let order = {
        start_date: "desc"
    };
    if (pastOrUpcoming === 'upcoming') {
        filters = {
            start_date: {
                _gte: "now()"
            }
        };
    }
    else if (pastOrUpcoming === 'past') {
        filters = {
            start_date: {
                _lte: "now()"
            }
        };
    }
    if (value) {
        let val = value;
        val = (0, global_1.capitaliseStr)(val);
        filters = Object.assign(Object.assign({}, filters), { _or: [
                {
                    types: {
                        _like: `${val}%`
                    }
                },
                {
                    venue_city: {
                        _like: `${val}%`
                    }
                }
            ] });
    }
    if (sort_by && order_of_sort) {
        const sort = `${sort_by}`;
        order = {};
        order[sort] = order_of_sort;
        if (sort_by === 'participants') {
            order = {
                workshop_participants_aggregate: {
                    count: order_of_sort
                }
            };
        }
        if (sort_by === 'leads') {
            order = {
                workshop_lead_volunteers_aggregate: {
                    count: order_of_sort
                }
            };
        }
        if (sort_by === 'volunteers') {
            order = {
                workshop_volunteers_aggregate: {
                    count: order_of_sort
                }
            };
        }
    }
    else if (sort_by) {
        const sort = `${sort_by}`;
        order = {};
        order[sort] = "asc";
        if (sort_by === 'participants') {
            order = {
                workshop_participants_aggregate: {
                    count: "asc"
                }
            };
        }
        if (sort_by === 'leads') {
            order = {
                workshop_lead_volunteers_aggregate: {
                    count: "asc"
                }
            };
        }
        if (sort_by === 'volunteers') {
            order = {
                workshop_volunteers_aggregate: {
                    count: "asc"
                }
            };
        }
    }
    else if (order_of_sort) {
        order = { start_date: order_of_sort };
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
    const variables = {
        offset: (page - 1) * no_of_records,
        limit: no_of_records,
        where: filters,
        order_by: order
    };
    const data = yield (0, getData_1.default)(queries_1.getPageWorkshops, variables);
    if (data === null || data === void 0 ? void 0 : data.errors) {
        return res.status(400).json({
            status: 'error',
            message: (_a = data === null || data === void 0 ? void 0 : data.errors[0]) === null || _a === void 0 ? void 0 : _a.message
        });
    }
    const workshops = (_b = data === null || data === void 0 ? void 0 : data.data) === null || _b === void 0 ? void 0 : _b.workshops.map((workshop) => {
        var _a, _b, _c, _d, _e, _f;
        return {
            concluding_date: workshop === null || workshop === void 0 ? void 0 : workshop.concluding_date,
            end_date: workshop === null || workshop === void 0 ? void 0 : workshop.end_date,
            start_date: workshop === null || workshop === void 0 ? void 0 : workshop.start_date,
            id: workshop === null || workshop === void 0 ? void 0 : workshop.id,
            types: workshop === null || workshop === void 0 ? void 0 : workshop.types,
            venue: workshop === null || workshop === void 0 ? void 0 : workshop.venue,
            venue_city: workshop === null || workshop === void 0 ? void 0 : workshop.venue_city,
            lead_volunteers_count: (_b = (_a = workshop === null || workshop === void 0 ? void 0 : workshop.workshop_lead_volunteers_aggregate) === null || _a === void 0 ? void 0 : _a.aggregate) === null || _b === void 0 ? void 0 : _b.count,
            volunteers_count: (_d = (_c = workshop === null || workshop === void 0 ? void 0 : workshop.workshop_volunteers_aggregate) === null || _c === void 0 ? void 0 : _c.aggregate) === null || _d === void 0 ? void 0 : _d.count,
            participants_count: (_f = (_e = workshop === null || workshop === void 0 ? void 0 : workshop.workshop_participants_aggregate) === null || _e === void 0 ? void 0 : _e.aggregate) === null || _f === void 0 ? void 0 : _f.count,
        };
    });
    return res.status(200).json({
        status: "success",
        message: "Data fetched successfully!",
        data: {
            workshops,
            total_pages: Math.ceil(((_e = (_d = (_c = data === null || data === void 0 ? void 0 : data.data) === null || _c === void 0 ? void 0 : _c.workshops_aggregate) === null || _d === void 0 ? void 0 : _d.aggregate) === null || _e === void 0 ? void 0 : _e.count) / no_of_records),
            current_page: page
        }
    });
});
exports.default = allPageWorkshops;
