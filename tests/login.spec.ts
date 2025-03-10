import { test, expect } from '@playwright/test';
import {loginData} from "../test-data/login.data";
import {LoginPage} from "../pages/login.page";

test.describe('User login to Demobank', () => {
let loginPage: LoginPage;
    test.beforeEach(async ({ page }) => {
        await page.goto("/index.html");
        loginPage = new LoginPage(page);
    })

    test('successful login with correct credentials',
        {
            tag: ["@login", "@smoke"],
            annotation:{
                type: 'Happy path',
                description: 'basic happy path test for login'
            }
            },
        async ({ page }) => {
        // Arrange
        const userId = loginData.userId;
        const userPassword = loginData.userPassword;
        const expectedUsername = 'Jan Demobankowy';

        // Act
        loginPage.login(userId, userPassword);

        // Assert
        await expect(page.getByTestId('user-name')).toHaveText(expectedUsername);
  });

    test('unsuccessful login with too short username',
        {tag: "@login"},
        async ({ page }) => {
        // Arrange
        const incorrectUserId = 'tester';
        const errorLoginId = 'identyfikator ma min. 8 znaków';

        // Act
        const loginPage = new LoginPage(page);
        await loginPage.loginInput.fill(incorrectUserId);
        await loginPage.passwordInput.click();

        // Assert
        await expect(loginPage.loginError).toHaveText(errorLoginId);
  });

    test('unsuccessful login with too short password',
        {tag: "@login"},
        async ({ page }) => {
        // Arrange
        const userId = loginData.userId;
        const incorrectUserPassword = 'haslo';
        const errorLoginPassword = 'hasło ma min. 8 znaków';

        // Act
        const loginPage = new LoginPage(page);
        await loginPage.loginInput.fill(userId)
        await loginPage.passwordInput.fill(incorrectUserPassword);
        await loginPage.passwordInput.blur();

        //Assert
        await expect(loginPage.passwordError).toHaveText(errorLoginPassword);
  });

});
