import { test, expect } from '@playwright/test';

test.describe('User login to Demobank', () => {

    test('successful login with correct credentials', async ({ page }) => {
        // Arrange
        const url = 'https://demo-bank.vercel.app/index.html';
        const userId = 'testerLo';
        const userPassword = 'haslo123';
        const expectedUsername = 'Jan Demobankowy';

        // Act
        await page.goto(url);
        await page.getByTestId('login-input').fill(userId);
        await page.getByTestId('password-input').fill(userPassword);
        await page.getByTestId('login-button').click();

        // Assert
        await expect(page.getByTestId('user-name')).toHaveText(expectedUsername);
  });

    test('unsuccessful login with too short username', async ({ page }) => {
      // Arrange
      const url = 'https://demo-bank.vercel.app/index.html';
      const incorrectUserId = 'tester';
      const errorLoginId = 'identyfikator ma min. 8 znaków';

      // Act
      await page.goto(url);
      await page.getByTestId('login-input').fill(incorrectUserId);
      await page.getByTestId('password-input').click();

      // Assert
      await expect(page.getByTestId('error-login-id')).toHaveText(errorLoginId);
  });

    test('unsuccessful login with too short password', async ({ page }) => {
      // Arrange
      const url = 'https://demo-bank.vercel.app/index.html';
      const userId = 'testerLo';
      const incorrectUserPassword = 'haslo';
      const errorLoginPassword = 'hasło ma min. 8 znaków';

      // Act
      await page.goto(url);
      await page.getByTestId('login-input').fill(userId);
      await page.getByTestId('password-input').fill(incorrectUserPassword);
      await page.getByTestId('password-input').blur(); //wyjście z danego pola

      //Assert
      await expect(page.getByTestId('error-login-password')).toHaveText(errorLoginPassword);
  });

});
