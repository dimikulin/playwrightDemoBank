import { test, expect } from '@playwright/test';
import {loginData} from "../test-data/login.data";
import {LoginPage} from "../pages/login.page";

test.describe('User login to Demobank', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("/index.html");
    })

    test('successful login with correct credentials', async ({ page }) => {
        // Arrange
        const userId = loginData.userId;
        const userPassword = loginData.userPassword;
        const expectedUsername = 'Jan Demobankowy';

        // Act
        const loginPage = new LoginPage(page);
        await loginPage.loginInput.fill(userId);
        await loginPage.passwordInput.fill(userPassword);
        await loginPage.loginButton.click();

        // Assert
        await expect(page.getByTestId('user-name')).toHaveText(expectedUsername);
  });

    test('unsuccessful login with too short username', async ({ page }) => {
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

    test('unsuccessful login with too short password', async ({ page }) => {
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
