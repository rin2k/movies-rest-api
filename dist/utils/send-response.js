"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, result) => {
    const response = {
        version: "1.0.0",
        timestamp: new Date(),
        result: result,
    };
    res.status(200).json(response);
};
exports.default = sendResponse;
