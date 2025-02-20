import {expect, test} from '@playwright/test';

test.describe('Pulpit tests', () => {

    test('successful login with correct credentials', async ({ page }) => {
            // Arrange
            const url = 'https://demo-bank.vercel.app/index.html';
            const userId = 'testerLo';
            const userPassword = 'haslo123';

            const receiverId = '2';
            const transferAmount = '150';
            const transferTitle = 'pizza';
            const expectedTransferReceiver = 'Chuck Demobankowy';

            // Act
            await page.goto(url);
            await page.getByTestId('login-input').fill(userId);
            await page.getByTestId('password-input').fill(userPassword);
            await page.getByTestId('login-button').click();

            await page.locator('#widget_1_transfer_receiver').selectOption(receiverId);
            await page.locator('#widget_1_transfer_amount').click();
            await page.locator('#widget_1_transfer_amount').fill(transferAmount);
            await page.locator('#widget_1_transfer_title').fill(transferTitle);

            await page.getByRole('button', { name: 'wykonaj' }).click();
            await page.getByTestId('close-button').click();

            // Assert
            await expect(page.locator('#show_messages')).toHaveText(`Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`);
    });

    test.only('successful mobile top-up', async ({ page }) => {
        await page.goto('https://demo-bank.vercel.app/');
        await page.getByTestId('login-input').fill('testerlo');
        await page.getByTestId('password-input').fill('password');
        await page.getByTestId('login-button').click();
        await page.locator('#widget_1_topup_receiver').selectOption('500 xxx xxx');
        await page.locator('#widget_1_topup_amount').fill('150');
        await page.locator('#uniform-widget_1_topup_agreement span').click();
        await page.getByRole('button', { name: 'doładuj telefon' }).click();
        await page.getByTestId('close-button').click();
        await expect(page.locator('#show_messages')).toHaveText('Doładowanie wykonane! 150,00PLN na numer 500 xxx xxx');
    });
});
