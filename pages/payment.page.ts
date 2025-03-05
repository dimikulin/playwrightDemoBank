import {Page} from "@playwright/test";
import {SideMenuCompontent} from "../compontents/side-menu.compontent";

export class PaymentPage {
    constructor(private page: Page) {
    }

    sideMenu = new SideMenuCompontent(this.page);

    transferReceiver = this.page.getByTestId('transfer_receiver');
    formAccountTo = this.page.getByTestId('form_account_to');
    formTitle = this.page.getByTestId('form_title');
    formAmount = this.page.getByTestId('form_amount');
    wykonajPrzelewButton = this.page.getByRole('button', { name: 'wykonaj przelew' });
    closeButton = this.page.getByTestId('close-button');
    showMessages = this.page.locator('#show_messages');
}