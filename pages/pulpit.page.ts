import {Page} from "@playwright/test";
import {SideMenuCompontent} from "../compontents/side-menu.compontent";

export class PulpitPage {
    constructor(private page: Page) {
    }

    sideMenu = new SideMenuCompontent(this.page);

    topupReceiver = this.page.locator('#widget_1_topup_receiver');
    topupAmount = this.page.locator('#widget_1_topup_amount');
    topupAgreementSpan = this.page.locator('#uniform-widget_1_topup_agreement span');

    doladujTelefonButton = this.page.getByRole('button', { name: 'doładuj telefon' });


    transferReceiver = this.page.locator('#widget_1_transfer_receiver');
    transferAmount = this.page.locator('#widget_1_transfer_amount');
    transferTitle = this.page.locator('#widget_1_transfer_title');

    wykonajButton = this.page.getByRole('button', { name: 'wykonaj' });
    closeButton = this.page.getByTestId('close-button');

    showMessages = this.page.locator('#show_messages');

    moneyValue = this.page.locator('#money_value');
}