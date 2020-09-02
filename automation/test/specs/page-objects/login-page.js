class LoginPage {

    openLoginPage () {
        browser.url('http://chatito.xyz/');
    }

    setEmail(value) {
        const emailField = $('#Email');
        emailField.waitForExist();
        emailField.setValue(value);
    }

    setPass(value) {
        const passField = $('#Password');
        passField.waitForExist();
        passField.setValue(value);
    }

    signIn() {
        const signInButton = $('button');
        signInButton.click();
        browser.pause(2000);
    }

}

module.exports = LoginPage;