"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../../constants/user");
var LOGGED_IN_AC = function (loggedInUser) { return ({ type: user_1.LOGGED_IN_USER, loggedInUser: loggedInUser }); };
var LOGIN_AC = function () { return ({ type: user_1.LOGIN }); };
var LOGIN_ERR_AC = function (login_error) { return ({ type: user_1.LOGIN_ERROR, login_error: login_error }); };
var LOGIN_SUCCESS_AC = function (user) { return ({ type: user_1.LOGIN_SUCCESS, user: user }); };
//# sourceMappingURL=user.js.map