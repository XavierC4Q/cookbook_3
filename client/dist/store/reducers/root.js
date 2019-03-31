"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("./user");
var redux_1 = require("redux");
exports.rootReducer = redux_1.combineReducers({
    users: user_1.userReducer
});
//# sourceMappingURL=root.js.map