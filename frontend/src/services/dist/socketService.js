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
exports.__esModule = true;
exports.connectSockets = void 0;
var toastrService_1 = require("services/toastrService");
var socket_io_client_1 = require("socket.io-client");
var env_1 = require("../env");
var storageHelper_1 = require("common/helpers/storageHelper");
var store_1 = require("store");
var routines_1 = require("scenes/Chat/routines");
var routines_2 = require("scenes/Workspace/routines");
var ClientSockets_1 = require("common/enums/ClientSockets");
var ServerSockets_1 = require("common/enums/ServerSockets");
var Routes_1 = require("common/enums/Routes");
var connected_react_router_1 = require("connected-react-router");
var routines_3 = require("containers/ThreadsContainer/routines");
var routines_4 = require("containers/Post/routines");
var routines_5 = require("containers/Thread/routines");
var server = env_1.env.urls.server;
exports.connectSockets = function () {
    // eslint-disable-next-line
    var chatSocket = socket_io_client_1["default"](server + "/chat", { query: "auth_token=" + storageHelper_1.getAccessToken() });
    chatSocket.on(ClientSockets_1.ClientSockets.AddPost, function (post) {
        var state = store_1.store.getState();
        if (post.chatId === state.chat.chat.id) {
            store_1.store.dispatch(routines_1.addPostWithSocketRoutine(post));
        }
        else {
            store_1.store.dispatch(routines_2.incUnreadCountRoutine({ chatId: post.chatId }));
        }
    });
    chatSocket.on(ClientSockets_1.ClientSockets.EditPost, function (post) {
        var state = store_1.store.getState();
        if (post.chatId === state.chat.chat.id) {
            store_1.store.dispatch(routines_1.editPostWithSocketRoutine(post));
        }
    });
    chatSocket.on(ClientSockets_1.ClientSockets.JoinChat, function (chatId) {
        chatSocket.emit(ServerSockets_1.ServerSockets.JoinChatRoom, chatId);
    });
    chatSocket.on(ClientSockets_1.ClientSockets.AddChat, function (chat) {
        store_1.store.dispatch(routines_1.addChatWithSocketRoutine(chat));
        store_1.store.dispatch(connected_react_router_1.push(Routes_1.Routes.Chat.replace(':whash', chat.workspace.hash).replace(':chash', chat.hash)));
    });
    chatSocket.on(ClientSockets_1.ClientSockets.AddReply, function (comment) {
        var state = store_1.store.getState();
        if (state.threads.threads) {
            store_1.store.dispatch(routines_3.addCommentWithSocketRoutine(comment));
        }
        var activeThread = state.workspace.activeThread;
        if (activeThread && activeThread.post.id === comment.postId) {
            store_1.store.dispatch(routines_2.addActiveCommentWithSocketRoutine(comment));
        }
    });
    chatSocket.on(ClientSockets_1.ClientSockets.AddReaction, function (reaction) {
        var _a;
        var state = store_1.store.getState();
        if (reaction.userId !== ((_a = state.user.user) === null || _a === void 0 ? void 0 : _a.id)) {
            store_1.store.dispatch(routines_4.addPostReactionWithSocketRoutine(reaction));
        }
    });
    chatSocket.on(ClientSockets_1.ClientSockets.DeleteReaction, function (reaction) {
        var _a;
        var state = store_1.store.getState();
        if (reaction.userId !== ((_a = state.user.user) === null || _a === void 0 ? void 0 : _a.id)) {
            store_1.store.dispatch(routines_4.deletePostReactionWithSocketRoutine(reaction));
        }
    });
    chatSocket.on(ClientSockets_1.ClientSockets.NewUserNotification, function (users, chatName, chatType) {
        store_1.store.dispatch(routines_2.newUserNotificationWithSocketRoutine({ users: users, chatType: chatType }));
        if (users.length === 1) {
            toastrService_1.toastrSuccess("User " + users[0].displayName + " was invited to chat " + chatName);
        }
        else {
            var usersString_1 = '';
            users.forEach(function (user, index) {
                usersString_1 += "" + user.displayName + (index === users.length - 1 ? '' : ', ');
            });
            toastrService_1.toastrSuccess("Users " + usersString_1 + " were invited to chat " + chatName);
        }
    });
    chatSocket.on(ClientSockets_1.ClientSockets.UpsertDraftPost, function (userId, chatId, draftPost) {
        var _a;
        var state = store_1.store.getState();
        if (chatId === state.chat.chat.id && ((_a = state.user.user) === null || _a === void 0 ? void 0 : _a.id) === userId) {
            store_1.store.dispatch(routines_1.upsertDraftPostWithSocketRoutine(draftPost));
            store_1.store.dispatch(routines_2.updateChatDraftPostRoutine(__assign(__assign({}, draftPost), { chatId: chatId })));
        }
    });
    chatSocket.on(ClientSockets_1.ClientSockets.DeleteDraftPost, function (userId, chatId) {
        var _a;
        var state = store_1.store.getState();
        if (chatId === state.chat.chat.id && ((_a = state.user.user) === null || _a === void 0 ? void 0 : _a.id) === userId) {
            store_1.store.dispatch(routines_1.deleteDraftPostWithSocketRoutine());
            store_1.store.dispatch(routines_2.updateChatDraftPostRoutine({ chatId: chatId }));
        }
    });
    chatSocket.on(ClientSockets_1.ClientSockets.UpsertDraftComment, function (userId, chatId, postId, draftComment) {
        var _a, _b, _c;
        var state = store_1.store.getState();
        if (postId === ((_a = state.workspace.activeThread) === null || _a === void 0 ? void 0 : _a.post.id) && ((_b = state.user.user) === null || _b === void 0 ? void 0 : _b.id) === userId) {
            store_1.store.dispatch(routines_5.upsertDraftCommentWithSocketRoutine(draftComment));
        }
        if (chatId === state.chat.chat.id && ((_c = state.user.user) === null || _c === void 0 ? void 0 : _c.id) === userId) {
            store_1.store.dispatch(routines_1.updatePostDraftCommentRoutine(__assign(__assign({}, draftComment), { postId: postId })));
        }
    });
    chatSocket.on(ClientSockets_1.ClientSockets.DeleteDraftComment, function (userId, chatId, postId) {
        var _a, _b, _c;
        var state = store_1.store.getState();
        if (postId === ((_a = state.workspace.activeThread) === null || _a === void 0 ? void 0 : _a.post.id) && ((_b = state.user.user) === null || _b === void 0 ? void 0 : _b.id) === userId) {
            store_1.store.dispatch(routines_5.deleteDraftCommentWithSocketRoutine());
        }
        if (chatId === state.chat.chat.id && ((_c = state.user.user) === null || _c === void 0 ? void 0 : _c.id) === userId) {
            store_1.store.dispatch(routines_1.updatePostDraftCommentRoutine({ postId: postId }));
        }
    });
};
