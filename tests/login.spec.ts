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
      await page.getByTestId('login-input').fill(incorrectUserId);
      await page.getByTestId('password-input').click();

      // Assert
      await expect(page.getByTestId('error-login-id')).toHaveText(errorLoginId);
  });

    test('unsuccessful login with too short password', async ({ page }) => {
      // Arrange
      const userId = loginData.userId;
      const incorrectUserPassword = 'haslo';
      const errorLoginPassword = 'hasło ma min. 8 znaków';

      // Act
      await page.getByTestId('login-input').fill(userId);
      await page.getByTestId('password-input').fill(incorrectUserPassword);
      await page.getByTestId('password-input').blur(); //wyjście z danego pola

      //Assert
      await expect(page.getByTestId('error-login-password')).toHaveText(errorLoginPassword);
  });

});
