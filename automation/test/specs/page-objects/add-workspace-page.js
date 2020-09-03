class AddWorkspacePage {

    get toastr() {return $('.rrt-text');} 
    
    pageElementsAreVisible() {
        const header = $('h1');
        expect(header).toHaveText('Create a new workspace');
        const label = $('label');
        expect(label).toHaveText('Workspace name');
    }

    addWorkspaceButton() {
        const buttons = $$('button');
        const addWorkspaceButton = buttons[0];
        addWorkspaceButton.waitForExist();
        addWorkspaceButton.click();
        browser.pause(3000);
    }

    addWorkspaceButtonProfile() {
        const popUpButtons = $$('#mainHeaderPopUp button');
        const addWorkspaceButton = popUpButtons[3];

        expect(addWorkspaceButton).toHaveText('Add workspace');
        addWorkspaceButton.click();

        browser.pause(3000);
    }

    nextButton() {
        const workspaceButtons = $$('button');
        const nextButton = workspaceButtons[1];
        nextButton.waitForExist();
        nextButton.click();
    }

    backButton() {
        const workspaceButtons = $$('button');
        const backButton = workspaceButtons[0];
        backButton.waitForExist();
        backButton.click();
        browser.pause(3000);
    }

    setWorkspaceName(value) {
        const workspaceField = $('.form-control');
        expect(workspaceField).toHaveAttribute('placeholder');
        workspaceField.setValue(value);
    }

    profileTab() {
        const profileTab = $('div[role="button"]');
        profileTab.waitForExist();
        profileTab.click();
    }

    signOutButton() {
        const popUpButtons = $$('#mainHeaderPopUp button');
        const signOutButton = popUpButtons[4];
        signOutButton.click();
    }

}

module.exports = AddWorkspacePage;