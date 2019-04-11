"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../constants/user");
var initialState = {
    currentUser: null,
    login_pending: false,
    login_error: '',
    signup_pending: false,
    signup_error: '',
    logout_pending: false,
    logout_error: ''
};
exports.userReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case user_1.LOGGED_IN_USER:
            return __assign({}, state, { currentUser: action.loggedInUser });
        case user_1.LOGIN:
            return __assign({}, state, { login_pending: true, login_error: '' });
        case user_1.LOGIN_ERROR:
            return __assign({}, state, { login_pending: false, login_error: action.login_error });
        case user_1.LOGIN_SUCCESS:
            return __assign({}, state, { login_pending: false, currentUser: action.user });
        case user_1.SIGNUP:
            return __assign({}, state, { signup_pending: true, signup_error: '' });
        case user_1.SIGNUP_SUCCESS:
            return __assign({}, state, { currentUser: action.newUser, signup_pending: false });
        case user_1.SIGNUP_ERROR:
            return __assign({}, state, { signup_pending: false, signup_error: action.signup_error });
        case user_1.LOGOUT:
            return __assign({}, state, { logout_pending: true, logout_error: '' });
        case user_1.LOGOUT_SUCCESS:
            return __assign({}, state, { currentUser: null, logout_pending: false });
        case user_1.LOGOUT_ERROR:
            return __assign({}, state, { logout_error: action.logout_error, logout_pending: false });
        default:
            return state;
    }
};
//# sourceMappingURL=user.js.map