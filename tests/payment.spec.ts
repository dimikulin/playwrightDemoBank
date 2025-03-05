import {expect, test} from '@playwright/test';
import {loginData} from "../test-data/login.data";
import {LoginPage} from "../pages/login.page";
import {PaymentPage} from "../pages/payment.page";

test.describe('Pulpit tests', () => {

    test.beforeEach(async ({ page }) => {
        const userId = loginData.userId;
        const userPassword = loginData.userPassword;

        await page.goto('/index.html');
        const loginPage = new LoginPage(page);
        await loginPage.loginInput.fill(userId);
        await loginPage.passwordInput.fill(userPassword);
        await loginPage.loginButton.click();

        await page.getByRole('link', { name: 'płatności' }).click();
    })

    test('simple payment', async ({ page }) => {
        // Arrange
        const transferReceiver = 'Pentacomp';
        const transferAccount = '12 3456 7890 1234 5678 9091 23211';
        const transferTitle = 'Przelew';
        const transferAmount = '1000';
        const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`;

        // Act
        const paymentPage = new PaymentPage(page);
        await paymentPage.transferReceiver.fill(transferReceiver);
        await paymentPage.formAccountTo.fill(transferAccount);
        await paymentPage.formTitle.fill(transferTitle);
        await paymentPage.formAmount.fill(transferAmount);
        await paymentPage.wykonajPrzelewButton.click();
        await paymentPage.closeButton.click();

        // Assert
        await expect(paymentPage.showMessages).toHaveText(expectedMessage)
    });
});