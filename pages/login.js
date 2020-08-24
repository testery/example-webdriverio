class LoginPage {
    get inputEmail() { return $('input[type="email"]'); }
    get inputPassword() { return $('input[type="password"]'); }
    get btnSignIn() { return $('input.form-submit'); }
}

export default new LoginPage();
