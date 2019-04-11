"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var redux_devtools_extension_1 = require("redux-devtools-extension");
var redux_thunk_1 = __importDefault(require("redux-thunk"));
var root_1 = require("./reducers/root");
exports.default = (function () {
    var middleware = [redux_thunk_1.default];
    var store = redux_1.createStore(root_1.rootReducer, undefined, redux_devtools_extension_1.composeWithDevTools(redux_1.applyMiddleware.apply(void 0, middleware)));
    return store;
});
//# sourceMappingURL=config.js.map