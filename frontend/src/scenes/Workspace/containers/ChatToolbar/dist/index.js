"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var styles_module_sass_1 = require("./styles.module.sass");
var modal_1 = require("routines/modal");
var ModalTypes_1 = require("common/enums/ModalTypes");
var InvitePopup_1 = require("containers/InvitePopup");
var CreateChannelModal_1 = require("containers/CreateChannelModal");
var CreateDirectModal_1 = require("containers/CreateDirectModal");
var connected_react_router_1 = require("connected-react-router");
var Routes_1 = require("common/enums/Routes");
var routines_1 = require("scenes/Chat/routines");
var react_router_dom_1 = require("react-router-dom");
var nameHelper_1 = require("common/helpers/nameHelper");
var ChatToolbar = function (_a) {
    var channels = _a.channels, directMessages = _a.directMessages, selectedChat = _a.selectedChat, currentUserId = _a.currentUserId, showModal = _a.showModal, router = _a.router, selectedWorkspace = _a.selectedWorkspace;
    var _b = react_1.useState(false), chatPanel = _b[0], setChatPanel = _b[1];
    var _c = react_1.useState(false), directPanel = _c[0], setDirectPanel = _c[1];
    var location = react_router_dom_1.useLocation();
    var doSelectChannel = function (chat) {
        if (selectedWorkspace && chat) {
            router(Routes_1.Routes.Chat.replace(':whash', selectedWorkspace.hash)
                .replace(':chash', chat.hash));
        }
        else if (selectedWorkspace) {
            router(Routes_1.Routes.Workspace.replace(':whash', selectedWorkspace.hash));
        }
        else {
            router(Routes_1.Routes.AddWorkspace);
        }
    };
    var getClassNameDiv = function (state) { return (state ? styles_module_sass_1["default"].listBoxHidden : styles_module_sass_1["default"].listBox); };
    var getClassNameImg = function (state) { return (state ? styles_module_sass_1["default"].chanelsImgRotate : styles_module_sass_1["default"].chanelsImg); };
    var getChannelSelect = function (chat) {
        if (selectedChat && selectedChat.id === chat.id) {
            return styles_module_sass_1["default"].channelSelect + " " + styles_module_sass_1["default"].channelCurrent;
        }
        return styles_module_sass_1["default"].channelSelect;
    };
    // eslint-disable-next-line
    var isActiveChanneSelector = function (route) { return location.pathname.includes(route.replace(':whash', selectedWorkspace.hash)); };
    // eslint-disable-next-line
    var channelSelector = function (text, iconFa, onClick, isActive) {
        if (onClick === void 0) { onClick = function () { }; }
        if (isActive === void 0) { isActive = function () { return false; }; }
        return (react_1["default"].createElement("button", { type: "button", className: isActive() ? styles_module_sass_1["default"].channelSelectActive : styles_module_sass_1["default"].channelSelect, onClick: onClick },
            react_1["default"].createElement("div", { className: styles_module_sass_1["default"].iconWrapper },
                react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: iconFa, color: "black" })),
            react_1["default"].createElement("span", { className: styles_module_sass_1["default"].buttonText }, text)));
    };
    var userChannel = function (channel) {
        var name = channel.name, isPrivate = channel.isPrivate, id = channel.id, draftPosts = channel.draftPosts;
        var draftPostText = (draftPosts === null || draftPosts === void 0 ? void 0 : draftPosts.length) ? draftPosts[0].text : undefined;
        return (react_1["default"].createElement("button", { type: "button", key: id, className: getChannelSelect(channel), onClick: function () { return doSelectChannel(channel); } },
            react_1["default"].createElement("div", { className: styles_module_sass_1["default"].iconWrapper },
                react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: isPrivate ? free_solid_svg_icons_1.faLock : free_solid_svg_icons_1.faHashtag, size: "xs" })),
            react_1["default"].createElement("div", { className: styles_module_sass_1["default"].chatBlock },
                react_1["default"].createElement("span", { className: styles_module_sass_1["default"].buttonText }, name),
                draftPostText && !(selectedChat && selectedChat.id === channel.id)
                    ? react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faPencilAlt, size: "xs" })
                    : null)));
    };
    var directChannel = function (directMessage) {
        var users = directMessage.users, id = directMessage.id, draftPosts = directMessage.draftPosts;
        var channelName = nameHelper_1.createDirectChannelName(users, currentUserId);
        var draftPostText = (draftPosts === null || draftPosts === void 0 ? void 0 : draftPosts.length) ? draftPosts[0].text : undefined;
        return (react_1["default"].createElement("button", { type: "button", key: id, className: getChannelSelect(directMessage), onClick: function () { return doSelectChannel(directMessage); } },
            react_1["default"].createElement("div", { className: styles_module_sass_1["default"].chatBlock },
                react_1["default"].createElement("div", { className: styles_module_sass_1["default"].chatBlockContainer },
                    react_1["default"].createElement("div", { className: styles_module_sass_1["default"].iconWrapper },
                        react_1["default"].createElement("div", { className: styles_module_sass_1["default"].onlineSign })),
                    react_1["default"].createElement("span", { className: styles_module_sass_1["default"].buttonText }, channelName)),
                draftPostText && !(selectedChat && selectedChat.id === directMessage.id)
                    ? react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faPencilAlt, color: "black" })
                    : null)));
    };
    var addChannelButton = function () { return (react_1["default"].createElement("button", { type: "button", className: styles_module_sass_1["default"].channelSelect, onClick: function () { return showModal({ modalType: ModalTypes_1.ModalTypes.CreateChannel, show: true }); } },
        react_1["default"].createElement("div", { className: styles_module_sass_1["default"].iconWrapper },
            react_1["default"].createElement("div", { className: styles_module_sass_1["default"].iconBorder },
                react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faPlus }))),
        react_1["default"].createElement("span", { className: styles_module_sass_1["default"].addButtonText }, "Add a channel"))); };
    var addDirectButton = function () { return (react_1["default"].createElement("button", { type: "button", className: styles_module_sass_1["default"].channelSelect, onClick: function () { return showModal({ modalType: ModalTypes_1.ModalTypes.CreateDirect, show: true }); } },
        react_1["default"].createElement("div", { className: styles_module_sass_1["default"].iconWrapper },
            react_1["default"].createElement("div", { className: styles_module_sass_1["default"].iconBorder },
                react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faPlus }))),
        react_1["default"].createElement("span", { className: styles_module_sass_1["default"].addButtonText }, "Add a direct"))); };
    var showInvitePopup = function () {
        showModal({ modalType: ModalTypes_1.ModalTypes.InvitePopup, show: true });
    };
    var goToRoute = function (route) { return router(route.replace(':whash', selectedWorkspace.hash)); };
    return (react_1["default"].createElement("div", { className: styles_module_sass_1["default"].leftToolbar },
        channelSelector('Invite to workspace', free_solid_svg_icons_1.faUserFriends, showInvitePopup),
        channelSelector('Threads', free_solid_svg_icons_1.faClipboardList, function () { return goToRoute(Routes_1.Routes.Threads); }, function () { return isActiveChanneSelector(Routes_1.Routes.Threads); }),
        channelSelector('Mentions & reactions', free_solid_svg_icons_1.faAt),
        channelSelector('Drafts', free_solid_svg_icons_1.faListAlt, function () { return goToRoute(Routes_1.Routes.Drafts); }, function () { return isActiveChanneSelector(Routes_1.Routes.Drafts); }),
        channelSelector('Saved Items', free_solid_svg_icons_1.faSearch),
        channelSelector('File Browser', free_solid_svg_icons_1.faDatabase),
        react_1["default"].createElement("div", { className: styles_module_sass_1["default"].buttonChannel },
            react_1["default"].createElement("button", { type: "button", className: styles_module_sass_1["default"].buttonSelect, onClick: function () { return setChatPanel(!chatPanel); } },
                react_1["default"].createElement("div", { className: styles_module_sass_1["default"].iconWrapper },
                    react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faCaretRight, className: getClassNameImg(chatPanel) })),
                react_1["default"].createElement("span", { className: styles_module_sass_1["default"].buttonText }, "Channels"))),
        react_1["default"].createElement("div", { className: getClassNameDiv(chatPanel) },
            channels.map(function (channel) { return (userChannel(channel)); }),
            addChannelButton()),
        react_1["default"].createElement("div", { className: styles_module_sass_1["default"].buttonChannel },
            react_1["default"].createElement("button", { type: "button", className: styles_module_sass_1["default"].buttonSelect, onClick: function () { return setDirectPanel(!directPanel); } },
                react_1["default"].createElement("div", { className: styles_module_sass_1["default"].iconWrapper },
                    react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faCaretRight, className: getClassNameImg(directPanel) })),
                react_1["default"].createElement("span", { className: styles_module_sass_1["default"].buttonText }, "Direct Messages"))),
        react_1["default"].createElement("div", { className: getClassNameDiv(directPanel) },
            directMessages.map(function (directMessage) { return (directChannel(directMessage)); }),
            addDirectButton()),
        react_1["default"].createElement(InvitePopup_1["default"], null),
        react_1["default"].createElement(CreateChannelModal_1["default"], null),
        react_1["default"].createElement(CreateDirectModal_1["default"], null)));
};
var mapStateToProps = function (state) { return ({
    channels: state.workspace.channels || [],
    directMessages: state.workspace.directMessages || [],
    selectedWorkspace: state.workspace.workspace,
    isLoading: state.workspace.loading,
    selectedChat: state.chat.chat
}); };
var mapDispatchToProps = {
    showModal: modal_1.showModalRoutine,
    router: connected_react_router_1.push,
    selectChat: routines_1.setCurrentChatRoutine
};
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ChatToolbar);
