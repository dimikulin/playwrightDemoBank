import {expect, test} from '@playwright/test';
import {loginData} from "../test-data/login.data";
import {LoginPage} from "../pages/login.page";
import {PulpitPage} from "../pages/pulpit.page";

test.describe('Pulpit tests', () => {

    test.beforeEach(async ({ page }) => {
                const userId = loginData.userId;
                const userPassword = loginData.userPassword;

                await page.goto('/index.html');
        const loginPage = new LoginPage(page);
        await loginPage.loginInput.fill(userId);
        await loginPage.passwordInput.fill(userPassword);
        await loginPage.loginButton.click();
        })
    test('successful login with correct credentials', async ({ page }) => {
                // Arrange
                const receiverId = '2';
                const transferAmount = '150';
                const transferTitle = 'pizza';
                const expectedTransferReceiver = 'Chuck Demobankowy';

                // Act
                const pulpitPage = new PulpitPage(page);
                await pulpitPage.transferReceiver.selectOption(receiverId);
                await pulpitPage.transferAmount.fill(transferAmount);
                await pulpitPage.transferTitle.fill(transferTitle);

                await pulpitPage.wykonajButton.click();
                await pulpitPage.closeButton.click();

                // Assert
                await expect(pulpitPage.showMessages).toHaveText(`Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`);
    });

    test('successful mobile top-up', async ({ page }) => {
                // Arrange
                const option = '500 xxx xxx';
                const amount = '150';

                // Act
                const pulpitPage = new PulpitPage(page);
                await pulpitPage.topupReceiver.selectOption(option);
                await pulpitPage.topupAmount.fill(amount);
                await pulpitPage.topupAgreementSpan.click();
                await pulpitPage.doladujTelefonButton.click();
                await pulpitPage.closeButton.click();

                // Assert
                await expect(pulpitPage.showMessages).toHaveText(`Doładowanie wykonane! ${amount},00PLN na numer ${option}`);
    });

    test('correct balance after successful mobile top-up', async ({ page }) => {
        // Arrange
        const option = '500 xxx xxx';
        const amount = '150';
        const expectedMessage = `Doładowanie wykonane! ${amount},00PLN na numer ${option}`;

        const initialBalance = await page.locator('#money_value').innerText();
        const expectedBalance = Number(initialBalance) - Number(amount);

        // Act
        const pulpitPage = new PulpitPage(page);
        await pulpitPage.topupReceiver.selectOption(option);
        await pulpitPage.topupAmount.fill(amount);
        await pulpitPage.topupAgreementSpan.click();
        await pulpitPage.doladujTelefonButton.click();
        await pulpitPage.closeButton.click();

        // Assert
        await expect(pulpitPage.showMessages).toHaveText(expectedMessage);
        await expect(pulpitPage.moneyValue).toHaveText(`${expectedBalance}`);
    });

});
