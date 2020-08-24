class LoginPage {
    get inputEmail() { $('input[type="email"]'); }
    get inputPassword() { $('input[type="password"]'); }
    get btnSignIn() { $('input.form-submit'); }
}

export default new LoginPage();
