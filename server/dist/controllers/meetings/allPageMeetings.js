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
const queries_1 = require("../../gql/meetings/queries");
const allPageMeetings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const { page: reqPage, no_of_records: reqRecords, sort_by, order_of_sort, start_date, end_date, value } = req === null || req === void 0 ? void 0 : req.query;
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
        if (sort_by === 'workshop') {
            order = {
                workshop: {
                    types: order_of_sort
                }
            };
        }
        if (sort_by === 'enrollments') {
            order = {
                meetings_enrollments_aggregate: {
                    count: order_of_sort
                }
            };
        }
        if (sort_by === 'volunteers') {
            order = {
                meetings_volunteers_aggregate: {
                    count: order_of_sort
                }
            };
        }
    }
    else if (sort_by) {
        const sort = `${sort_by}`;
        order = {};
        order[sort] = "asc";
        if (sort_by === 'workshop') {
            order = {
                workshop: {
                    types: "asc"
                }
            };
        }
        if (sort_by === 'enrollments') {
            order = {
                meetings_enrollments_aggregate: {
                    count: "asc"
                }
            };
        }
        if (sort_by === 'volunteers') {
            order = {
                meetings_volunteers_aggregate: {
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
    if (start_date && end_date) {
        let end = end_date;
        let start = start_date;
        filters = {
            date: {
                _lte: (0, global_1.formatDate)(end),
                _gte: (0, global_1.formatDate)(start)
            }
        };
    }
    else if (start_date) {
        let start = start_date;
        filters = {
            date: {
                _gte: (0, global_1.formatDate)(start)
            }
        };
    }
    else if (end_date) {
        let end = end_date;
        filters = {
            date: {
                _lte: (0, global_1.formatDate)(end)
            }
        };
    }
    if (value) {
        let val = value;
        val = (0, global_1.capitaliseStr)(val);
        filters = Object.assign(Object.assign({}, filters), { _or: [
                {
                    workshop: {
                        types: {
                            _like: `${val}%`
                        }
                    }
                },
                {
                    venue_city: {
                        _like: `${val}%`
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
    const data = yield (0, getData_1.default)(queries_1.getPageMeetings, variables);
    if (data === null || data === void 0 ? void 0 : data.errors) {
        return res.status(400).json({
            status: 'error',
            message: (_a = data === null || data === void 0 ? void 0 : data.errors[0]) === null || _a === void 0 ? void 0 : _a.message
        });
    }
    const meetings = (_c = (_b = data === null || data === void 0 ? void 0 : data.data) === null || _b === void 0 ? void 0 : _b.meetings) === null || _c === void 0 ? void 0 : _c.map((meeting) => {
        var _a, _b, _c, _d, _e;
        return {
            type: meeting === null || meeting === void 0 ? void 0 : meeting.type,
            venue: meeting === null || meeting === void 0 ? void 0 : meeting.venue,
            venue_city: meeting === null || meeting === void 0 ? void 0 : meeting.venue_city,
            date: meeting === null || meeting === void 0 ? void 0 : meeting.date,
            id: meeting === null || meeting === void 0 ? void 0 : meeting.id,
            workshop_type: (_a = meeting === null || meeting === void 0 ? void 0 : meeting.workshop) === null || _a === void 0 ? void 0 : _a.types,
            volunteers: (_c = (_b = meeting === null || meeting === void 0 ? void 0 : meeting.meetings_volunteers_aggregate) === null || _b === void 0 ? void 0 : _b.aggregate) === null || _c === void 0 ? void 0 : _c.count,
            enrollments: (_e = (_d = meeting === null || meeting === void 0 ? void 0 : meeting.meetings_enrollments_aggregate) === null || _d === void 0 ? void 0 : _d.aggregate) === null || _e === void 0 ? void 0 : _e.count
        };
    });
    return res.status(200).json({
        status: "success",
        message: "Data fetched successfully!",
        data: {
            meetings,
            total_pages: Math.ceil(((_f = (_e = (_d = data === null || data === void 0 ? void 0 : data.data) === null || _d === void 0 ? void 0 : _d.meetings_aggregate) === null || _e === void 0 ? void 0 : _e.aggregate) === null || _f === void 0 ? void 0 : _f.count) / no_of_records),
            current_page: page
        }
    });
});
exports.default = allPageMeetings;
