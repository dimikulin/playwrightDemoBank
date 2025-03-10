import {expect, test} from '@playwright/test';
import {loginData} from "../test-data/login.data";
import {LoginPage} from "../pages/login.page";
import {PaymentPage} from "../pages/payment.page";
import {PulpitPage} from "../pages/pulpit.page";

test.describe('Pulpit tests', () => {
    let paymentPage: PaymentPage;

    test.beforeEach(async ({ page }) => {
        const userId = loginData.userId;
        const userPassword = loginData.userPassword;

        await page.goto('/index.html');
        const loginPage = new LoginPage(page);
        await loginPage.login(userId, userPassword);

        const pulpitPage = new PulpitPage(page);
        await pulpitPage.sideMenu.paymentButton.click();

        paymentPage = new PaymentPage(page);
    })

    test('simple payment',
        {
            tag: "@integration",
            annotation:{
                type:'documentation',
                description:'https://www.youtube.com/watch?v=SzWs96aDyxk&list=PLfKhn9AcZ-cD2TCB__K7NP5XARaCzZYn7&index=29'
            }
        },
        async ({ page }) => {
        // Arrange
        const transferReceiver = 'Pentacomp';
        const transferAccount = '12 3456 7890 1234 5678 9091 23211';
        const transferTitle = 'Przelew';
        const transferAmount = '1000';
        const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`;

        // Act
        await paymentPage.payment(transferReceiver, transferAccount, transferTitle, transferAmount);
        // Assert
        await expect(paymentPage.showMessages).toHaveText(expectedMessage)
    });
});