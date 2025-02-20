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
    await page.goto('https://demo-bank.vercel.app/index.html');
    await page.getByTestId('login-input').fill('tester');
    await page.getByTestId('password-input').click();

    await expect(page.getByTestId('error-login-id')).toHaveText('identyfikator ma min. 8 znaków');
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/index.html');
    await page.getByTestId('login-input').fill('testerLo');
    await page.getByTestId('password-input').fill('haslo');
    await page.getByTestId('password-input').blur(); //wyjście z danego pola

    await expect(page.getByTestId('error-login-password')).toHaveText('hasło ma min. 8 znaków');
  });

});
