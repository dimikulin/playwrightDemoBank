import {expect, test} from '@playwright/test';

test.describe('Pulpit tests', () => {

        test.beforeEach(async ({ page }) => {
                const url = 'https://demo-bank.vercel.app/index.html';
                const userId = 'testerLo';
                const userPassword = 'haslo123';
                await page.goto(url);
                await page.getByTestId('login-input').fill(userId);
                await page.getByTestId('password-input').fill(userPassword);
                await page.getByTestId('login-button').click();
        })
    test('successful login with correct credentials', async ({ page }) => {
            // Arrange
            const receiverId = '2';
            const transferAmount = '150';
            const transferTitle = 'pizza';
            const expectedTransferReceiver = 'Chuck Demobankowy';

            // Act
            await page.locator('#widget_1_transfer_receiver').selectOption(receiverId);
            await page.locator('#widget_1_transfer_amount').click();
            await page.locator('#widget_1_transfer_amount').fill(transferAmount);
            await page.locator('#widget_1_transfer_title').fill(transferTitle);

            await page.getByRole('button', { name: 'wykonaj' }).click();
            await page.getByTestId('close-button').click();

            // Assert
            await expect(page.locator('#show_messages')).toHaveText(`Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`);
    });

    test('successful mobile top-up', async ({ page }) => {
            // Arrange
            const option = '500 xxx xxx';
            const amount = '150';

            // Act
            await page.locator('#widget_1_topup_receiver').selectOption(option);
            await page.locator('#widget_1_topup_amount').fill(amount);
            await page.locator('#uniform-widget_1_topup_agreement span').click();
            await page.getByRole('button', { name: 'doładuj telefon' }).click();
            await page.getByTestId('close-button').click();

            // Assert
            await expect(page.locator('#show_messages')).toHaveText(`Doładowanie wykonane! ${amount},00PLN na numer ${option}`);
    });

});
