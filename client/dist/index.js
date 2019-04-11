"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var react_router_dom_1 = require("react-router-dom");
var react_redux_1 = require("react-redux");
var config_1 = __importDefault(require("./store/config"));
require("./index.css");
var App_1 = __importDefault(require("./App"));
var serviceWorker = __importStar(require("./serviceWorker"));
react_dom_1.default.render(react_1.default.createElement(react_redux_1.Provider, { store: config_1.default() },
    react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
        react_1.default.createElement(App_1.default, null))), document.getElementById('root'));
serviceWorker.unregister();
//# sourceMappingURL=index.js.map