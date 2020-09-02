const assert = require('assert');

const LoginPage = require('./page-objects/login-page');
const Seed = require('./seed-data/data.json');
const AddWorkspacePage = require('./page-objects/add-workspace-page');

const addWorkspacePage = new AddWorkspacePage();
const loginPage = new LoginPage();

describe('adding workspace', () => {

    beforeEach(() => {
        loginPage.openLoginPage();
        loginPage.setEmail(Seed.login.email);
        loginPage.setPass(Seed.login.password);
        loginPage.signIn();
    })

    afterEach(() => {
        browser.reloadSession();
    })

    it('should add a new workspace via left side toolbar', () => {
        addWorkspacePage.addWorkspaceButton();
        addWorkspacePage.pageElementsAreVisible();
        addWorkspacePage.setWorkspaceName(Seed.workspaces.workspaceOne);
        addWorkspacePage.nextButton();
    });

    it('should be able to cancel adding a workspace', () => {
        addWorkspacePage.addWorkspaceButton();
        addWorkspacePage.pageElementsAreVisible();
        addWorkspacePage.setWorkspaceName(Seed.workspaces.workspaceTwo);
        addWorkspacePage.backButton();
    });

   it('should add a new workspace via profile tab', () => {
        addWorkspacePage.profileTab();
        addWorkspacePage.addWorkspaceButtonProfile();
        addWorkspacePage.pageElementsAreVisible();
        addWorkspacePage.setWorkspaceName(Seed.workspaces.workspaceThree);
        addWorkspacePage.nextButton();
    });

    it('should not add a workspace with the same name', () => {
        browser.pause(1000);
        addWorkspacePage.addWorkspaceButton();
        addWorkspacePage.pageElementsAreVisible();
        addWorkspacePage.setWorkspaceName(Seed.workspaces.workspaceFour);
        addWorkspacePage.nextButton();

        const toastr = addWorkspacePage.toastr;
        expect(toastr).toHaveText('This workspace is already exists! Please, choose the other name for your workspace.');
    });
});

describe('Sign Out option', () => {
    beforeEach(() => {
        loginPage.openLoginPage();
        loginPage.setEmail(Seed.login.email);
        loginPage.setPass(Seed.login.password);
        loginPage.signIn();
    })

    afterEach(() => {
        browser.reloadSession();
    })

    it('should sign out from the app', () => {
        addWorkspacePage.profileTab();
        addWorkspacePage.signOutButton();


    });
});
describe('Create channel/direct', () => {

    beforeEach(() => {
        loginPage.openLoginPage();
        loginPage.setEmail(Seed.login.email);
        loginPage.setPass(Seed.login.password);
        loginPage.signIn();
    })

    // it('should create a channel', () => {
    //     browser.url('http://chatito.xyz/');

    //     const buttons = $$('button');
    //     const addChannel = buttons[9];
    //     addChannel.click();

    //     const channelName = $('#channelName');
    //     channelName.setValue('test channel');

    //     const profileButtons = $$('button');
    //     const createButton = profileButtons[13];
    //     createButton.click();

    //     browser.reloadSession();

    // });

})