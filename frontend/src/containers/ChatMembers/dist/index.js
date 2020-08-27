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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var ModalTypes_1 = require("common/enums/ModalTypes");
var modal_1 = require("routines/modal");
var ModalWindow_1 = require("components/ModalWindow");
var routines_1 = require("scenes/Chat/routines");
var ChatMember_1 = require("components/ChatMember");
var ChatMembers = function (_a) {
    var isShown = _a.isShown, toggleModal = _a.toggleModal, getUserList = _a.getUserList, removeUser = _a.removeUser, chat = _a.chat, currentUser = _a.currentUser;
    var handleCloseModal = function () {
        toggleModal({ modalType: ModalTypes_1.ModalTypes.ChatMembers, show: false });
    };
    var removeUserFromChat = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, removeUser({ chatId: chat.id, userId: userId })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, getUserList(chat.id)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var onInvite = function () {
        toggleModal({ modalType: ModalTypes_1.ModalTypes.InviteChat, show: true });
    };
    var isCreator = chat.createdByUserId === currentUser.id;
    return (react_1["default"].createElement(ModalWindow_1["default"], { isShown: isShown, onHide: handleCloseModal },
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("button", { type: "button", onClick: onInvite }, "Add user"),
            chat.users.length <= 1
                ? 'You are the only member of this chat!'
                : chat.users.map(function (user) {
                    if (currentUser.id === user.id) {
                        return null;
                    }
                    return (react_1["default"].createElement(ChatMember_1["default"], { removeUser: removeUserFromChat, user: user, key: user.id, isCreator: isCreator }));
                }))));
};
var mapStateToProps = function (state) {
    var chat = state.chat.chat, chatMembers = state.modal.chatMembers, currentUser = state.user.user;
    return {
        isShown: chatMembers,
        chat: chat,
        currentUser: currentUser
    };
};
var mapDispatchToProps = {
    getUserList: routines_1.fetchChatUsersRoutine,
    removeUser: routines_1.removeUserFromChatRoutine,
    toggleModal: modal_1.showModalRoutine
};
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ChatMembers);
