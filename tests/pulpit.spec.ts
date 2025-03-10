import {expect, test} from '@playwright/test';
import {loginData} from "../test-data/login.data";
import {LoginPage} from "../pages/login.page";
import {PulpitPage} from "../pages/pulpit.page";
import playwrightConfig from "../playwright.config";

test.describe('Pulpit tests', () => {
    let pulpitPage: PulpitPage;

    test.beforeEach(async ({ page }) => {
                const userId = loginData.userId;
                const userPassword = loginData.userPassword;

                await page.goto('/index.html');
                const loginPage = new LoginPage(page);
                await loginPage.login(userId, userPassword);
                pulpitPage = new PulpitPage(page);
        })
    test('successful login with correct credentials',
        {
            tag: ["@pulpit", "@integration"],
            annotation:{
                type:'documentation',
                description:'https://www.youtube.com/watch?v=XjSZirX3x8c&list=PLfKhn9AcZ-cD2TCB__K7NP5XARaCzZYn7&index=31'
            }
        },
        async ({ page }) => {
                // Arrange
                const receiverId = '2';
                const transferAmount = '150';
                const transferTitle = 'pizza';
                const expectedTransferReceiver = 'Chuck Demobankowy';

                // Act
                pulpitPage.loginWithCorrectCredentials(receiverId,transferAmount,transferTitle);
                // Assert
                await expect(pulpitPage.showMessages).toHaveText(`Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`);
    });

    test('successful mobile top-up',
        {tag: ["@pulpit", "@integration"]},
        async ({ page }) => {
                // Arrange
                const option = '500 xxx xxx';
                const amount = '150';

                // Act
                pulpitPage.successfulMobileTopup(option, amount)

                // Assert
                await expect(pulpitPage.showMessages).toHaveText(`Doładowanie wykonane! ${amount},00PLN na numer ${option}`);
    });

    test('correct balance after successful mobile top-up',
        {tag: ["@pulpit", "@integration"]},
        async ({ page }) => {
        // Arrange
        const option = '500 xxx xxx';
        const amount = '150';
        const expectedMessage = `Doładowanie wykonane! ${amount},00PLN na numer ${option}`;

        const initialBalance = await page.locator('#money_value').innerText();
        const expectedBalance = Number(initialBalance) - Number(amount);

        // Act
        pulpitPage.successfulMobileTopup(option, amount);

        // Assert
        await expect(pulpitPage.showMessages).toHaveText(expectedMessage);
        await expect(pulpitPage.moneyValue).toHaveText(`${expectedBalance}`);
    });

});
